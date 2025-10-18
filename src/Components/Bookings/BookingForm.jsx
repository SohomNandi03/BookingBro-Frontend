import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import { getRoomById, bookRoom } from "../Utils/APIFunctions";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrorMessage("");
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const price = roomPrice || 0;
    return diffInDays > 0 ? diffInDays * price : 0;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    return adultCount >= 1 && adultCount + childrenCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!booking.checkInDate) {
      setErrorMessage("Check-in date is required!");
      return false;
    }
    if (!booking.checkOutDate) {
      setErrorMessage("Check-out date is required!");
      return false;
    }
    if (moment(booking.checkOutDate).isSameOrBefore(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must come after Check-in date!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!booking.checkInDate || !booking.checkOutDate) {
      setErrorMessage("Please select both Check-in and Check-out dates");
      setIsValidated(true);
      return;
    }

    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
      setErrorMessage("");
    }

    setIsValidated(true);
  };

const handleFormSubmit = async () => {
  // Booking API call
  const bookingData = {
    ...booking,
    numOfAdults: booking.numberOfAdults,
    numOfChildren: booking.numberOfChildren,
    totalNumOfGuest: parseInt(booking.numberOfAdults) + parseInt(booking.numberOfChildren),
    totalPayment: calculatePayment(),
  };
  try {
    // API should return the booking object including bookingConfirmationCode
    const confirmedBooking = await bookRoom(roomId, bookingData);

    // Navigate to booking success page with full booking object
    navigate("/booking-success", { state: { booking: confirmedBooking } });
  } catch (error) {
    setErrorMessage(error.message || "Booking failed. Try again.");
  }
};

  const inputStyle = {
    borderRadius: "0.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "0.5rem 1rem",
  };

  const cardStyle = {
    borderRadius: "1rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    border: "none",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  };

  const buttonHoverStyle = {
    background: "linear-gradient(135deg, #feb47b, #ff7e5f)",
    transform: "translateY(-2px)",
  };

  const [hover, setHover] = useState(false);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div style={cardStyle}>
            <h3 className="text-center fw-bold mb-4" style={{ color: "#2c3e50" }}>
              Reserve Your Room
            </h3>
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>Full Name</Form.Label>
                <FormControl
                  required
                  type="text"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="John Doe"
                  onChange={handleInputChange}
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">Please enter your fullname.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2c3e50", fontWeight: 500 }}>Email Address</Form.Label>
                <FormControl
                  required
                  type="email"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="example@mail.com"
                  onChange={handleInputChange}
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
              </Form.Group>

              <fieldset className="mb-3">
                <legend style={{ color: "#2c3e50", fontWeight: 500 }}>Lodging Period</legend>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Label>Check-in</Form.Label>
                    <FormControl
                      required
                      type="date"
                      name="checkInDate"
                      value={booking.checkInDate}
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Check-out</Form.Label>
                    <FormControl
                      required
                      type="date"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset className="mb-4">
                <legend style={{ color: "#2c3e50", fontWeight: 500 }}>Guests</legend>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Label>Adults</Form.Label>
                    <FormControl
                      required
                      type="number"
                      name="numberOfAdults"
                      value={booking.numberOfAdults}
                      min={1}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Children</Form.Label>
                    <FormControl
                      required
                      type="number"
                      name="numberOfChildren"
                      value={booking.numberOfChildren}
                      min={0}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Continue
              </button>
            </Form>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
