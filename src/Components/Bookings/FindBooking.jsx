import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { cancelBooking, getBookingByConfirmationCode } from "../Utils/APIFunctions";

const FindBooking = () => {
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: ""
  });

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: ""
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const handleInputChange = (event) => setConfirmationCode(event.target.value);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) setError(error.response.data.message);
      else setError(error.message);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  const handleBackHome = () => navigate("/");
  const handleMyBookings = () => navigate("/my-bookings");

  return (
    <div className="container py-5 d-flex flex-column align-items-center" style={{ minHeight: "80vh" }}>
      <h2 className="text-center mb-4" style={{ fontWeight: 700, color: "#FFC107" }}>
        Find My Booking
      </h2>

      <form onSubmit={handleFormSubmit} className="col-md-6 mb-4">
        <div className="input-group shadow rounded">
          <input
            className="form-control border-0 py-2"
            type="text"
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder="Enter your booking code"
            style={{ backgroundColor: "#222", color: "#FFC107" }}
          />
          <button
            type="submit"
            className="btn fw-bold"
            style={{ backgroundColor: "#FFC107", color: "#000" }}
          >
            {isLoading ? "Searching..." : "Find Booking"}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger w-75 text-center" style={{ backgroundColor: "#333", color: "#FFC107" }}>
          {error}
        </div>
      )}

      {bookingInfo.bookingConfirmationCode && !error && (
        <div className="col-md-8 mt-3">
          <div className="card shadow-lg p-4" style={{ borderRadius: "1rem", backgroundColor: "#111", color: "#FFC107" }}>
            <h4 className="text-center mb-3">🎉 Booking Found!</h4>

            <div className="p-3" style={{ backgroundColor: "#222", borderRadius: "0.75rem" }}>
              <p><strong>Confirmation Code:</strong> <span className="badge bg-warning text-dark">{bookingInfo.bookingConfirmationCode}</span></p>
              <p><strong>Room Number:</strong> {bookingInfo.room.id || "N/A"}</p>
              <p><strong>Room Type:</strong> {bookingInfo.room.roomType || "N/A"}</p>
              <p><strong>Check-in Date:</strong> {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}</p>
              <p><strong>Check-out Date:</strong> {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}</p>
              <p><strong>Full Name:</strong> {bookingInfo.guestFullName}</p>
              <p><strong>Email:</strong> {bookingInfo.guestEmail}</p>
              <p>
                <strong>Guests:</strong>{" "}
                <span className="badge bg-primary me-2">Adults: {bookingInfo.numOfAdults}</span>
                <span className="badge bg-info text-dark">Children: {bookingInfo.numOfChildren}</span>
              </p>
              <p><strong>Total Guests:</strong> {bookingInfo.totalNumOfGuest}</p>
            </div>

            {!isDeleted && (
              <button
                onClick={handleBookingCancellation}
                className="btn fw-bold mt-3 w-100"
                style={{ backgroundColor: "#DC3545", color: "#fff", borderRadius: "0.5rem" }}
              >
                Cancel Booking
              </button>
            )}

            <div className="d-flex justify-content-between mt-3">
              <button
                onClick={handleBackHome}
                className="btn fw-bold"
                style={{ backgroundColor: "#FFC107", color: "#000", borderRadius: "0.5rem", width: "48%" }}
              >
                Back to Home
              </button>
              <button
                onClick={handleMyBookings}
                className="btn fw-bold"
                style={{ backgroundColor: "#FFC107", color: "#000", borderRadius: "0.5rem", width: "48%" }}
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleted && (
        <div className="alert w-50 text-center mt-3" style={{ backgroundColor: "#333", color: "#FFC107" }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FindBooking;
