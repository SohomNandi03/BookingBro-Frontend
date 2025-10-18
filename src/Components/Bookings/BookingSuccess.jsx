import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking; // full booking object

  const handleBackHome = () => navigate("/");
  const handleMyBookings = () => navigate("/my-bookings");

  return (
    <div
      className="container py-5 d-flex flex-column align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#111" }}
    >
      <Header title="Booking Confirmation" />

      <div
        className="card shadow-lg p-4 mt-5"
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "1rem",
          backgroundColor: "#000",
          color: "#FFC107",
          border: "2px solid #FFC107",
        }}
      >
        {booking ? (
          <>
            <h2
              className="text-center mb-3"
              style={{ fontWeight: 700, color: "#FFC107" }}
            >
              🎉 Booking Confirmed!
            </h2>
            <p
              className="text-center fw-bold mb-4"
              style={{ fontSize: "1.1rem", color: "#FFC107" }}
            >
              Your booking has been successfully confirmed.
            </p>

            <div
              className="p-3 mb-4"
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "0.75rem",
                border: "1px solid #FFC107",
                color: "#FFC107",
              }}
            >
              <h5 className="mb-3" style={{ fontWeight: 600 }}>
                Booking Details
              </h5>

              <p>
                <strong>Confirmation Code:</strong>{" "}
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  {booking.bookingConfirmationCode || "N/A"}
                </span>
              </p>

              <p><strong>Name:</strong> {booking.guestFullName || "N/A"}</p>
              <p><strong>Email:</strong> {booking.guestEmail || "N/A"}</p>

              <p>
                <strong>Guests:</strong>{" "}
                <span
                  className="badge me-2"
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  Adults: {booking.numOfAdults || 0}
                </span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  Children: {booking.numOfChildren || 0}
                </span>
              </p>

              <p>
                <strong>Total Guests:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    padding: "2px 8px",
                    borderRadius: "0.25rem",
                    fontWeight: 600,
                  }}
                >
                  {booking.totalNumOfGuest || 0}
                </span>
              </p>

              <p>
                <strong>Check-in:</strong>{" "}
                {booking.checkInDate
                  ? new Date(booking.checkInDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Check-out:</strong>{" "}
                {booking.checkOutDate
                  ? new Date(booking.checkOutDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Room:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    padding: "2px 8px",
                    borderRadius: "0.25rem",
                    fontWeight: 600,
                  }}
                >
                  {booking.room?.roomName || "N/A"}
                </span>
              </p>

              <p>
                <strong>Total Payment:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    padding: "2px 8px",
                    borderRadius: "0.25rem",
                    fontWeight: 700,
                  }}
                >
                  ${booking.totalPayment || 0}
                </span>
              </p>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn fw-bold"
                onClick={handleBackHome}
                style={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  borderRadius: "0.5rem",
                  width: "48%",
                  padding: "0.6rem 0",
                  fontSize: "1rem",
                }}
              >
                Back to Home
              </button>
              <button
                className="btn fw-bold"
                onClick={handleMyBookings}
                style={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  borderRadius: "0.5rem",
                  width: "48%",
                  padding: "0.6rem 0",
                  fontSize: "1rem",
                }}
              >
                My Bookings
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-danger mb-3">❌ Booking Failed!</h3>
            <p style={{ color: "#FFC107" }}>Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
