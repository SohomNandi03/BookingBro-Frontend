import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../Common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate;
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      
      <div className="table-responsive mt-4 shadow rounded-4">
        <table className="table table-hover align-middle mb-0 bg-white rounded-4">
          <thead className="table-dark rounded-4">
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Room ID</th>
              <th scope="col">Room Type</th>
              <th scope="col">Check-In Date</th>
              <th scope="col">Check-Out Date</th>
              <th scope="col">Guest Name</th>
              <th scope="col">Guest Email</th>
              <th scope="col">Adults</th>
              <th scope="col">Children</th>
              <th scope="col">Total Guest</th>
              <th scope="col">Confirmation Code</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking.id} className="align-middle" style={{ transition: "all 0.3s" }}>
                  <td>{index + 1}</td>
                  <td>{booking.id}</td>
                  <td>{booking.room.id}</td>
                  <td>{booking.room.roomType}</td>
                  <td>{booking.checkInDate}</td>
                  <td>{booking.checkOutDate}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.guestEmail}</td>
                  <td>{booking.numOfAdults}</td>
                  <td>{booking.numOfChildren}</td>
                  <td>{booking.totalNumOfGuests}</td>
                  <td>{booking.bookingConfirmationCode}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm shadow-sm"
                      style={{ borderRadius: "0.5rem", padding: "0.35rem 0.6rem" }}
                      onClick={() => handleBookingCancellation(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center py-3 text-muted">
                  No bookings found for the selected dates
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BookingsTable;
