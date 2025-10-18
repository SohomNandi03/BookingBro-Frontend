import React, { useState } from "react";
import { parseISO, format, differenceInDays } from "date-fns";
import { FaUser, FaCalendarAlt, FaDollarSign, FaKey } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, onConfirm }) => {
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    if (isBooking) return;
    setIsBooking(true);

    try {
      // API call returns the confirmed booking with code, payment, etc.
      const confirmed = await onConfirm();
      setConfirmedBooking(confirmed);

      setTimeout(() => {
        navigate("/booking-success", { state: { booking: confirmed } });
      }, 1000);
    } catch (error) {
      alert("Booking failed! Please try again.");
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };

  const displayBooking = confirmedBooking || booking;
  const checkInDate = parseISO(displayBooking.checkInDate);
  const checkOutDate = parseISO(displayBooking.checkOutDate);
  const numberOfDays = differenceInDays(checkOutDate, checkInDate);

  const cardStyle = {
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    padding: "2rem",
    backgroundColor: "#111",
    color: "#FFC107",
  };

  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "0.5rem",
    fontSize: "1rem",
  };

  const totalStyle = {
    backgroundColor: "#FFC107",
    borderRadius: "0.75rem",
    color: "#000",
    padding: "1rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#FFC107",
    border: "none",
    borderRadius: "0.75rem",
    padding: "0.6rem 1rem",
    fontWeight: "bold",
    color: "#000",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 col-xl-6">
        <div style={cardStyle} className="mt-5">
          <h4 className="mb-4" style={{ fontWeight: 600, textAlign: "center" }}>
            Reservation Summary
          </h4>

          {displayBooking.bookingConfirmationCode && (
            <div style={sectionStyle}>
              <FaKey />
              <span>Confirmation Code: {displayBooking.bookingConfirmationCode}</span>
            </div>
          )}

          <div style={sectionStyle}>
            <FaUser />
            <span>
              {displayBooking.guestFullName} ({displayBooking.numberOfAdults} Adult
              {displayBooking.numberOfAdults > 1 ? "s" : ""},{" "}
              {displayBooking.numberOfChildren} Children)
            </span>
          </div>

          <div style={sectionStyle}>
            <FaCalendarAlt />
            <span>
              {format(checkInDate, "MMM do, yyyy")} → {format(checkOutDate, "MMM do, yyyy")} (
              {numberOfDays} days)
            </span>
          </div>

          <div style={totalStyle}>
            <FaDollarSign /> Total Payment: ${displayBooking.totalPayment || payment}
          </div>

          {!confirmedBooking && (
            <Button
              style={hover ? { ...buttonStyle, opacity: 0.9 } : buttonStyle}
              onClick={handleConfirmBooking}
              disabled={isBooking}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {isBooking ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          )}

          {confirmedBooking && (
            <div className="text-center mt-3">
              <h5 className="text-success">🎉 Booking Successful!</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
