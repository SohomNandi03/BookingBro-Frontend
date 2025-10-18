import React, { useEffect, useState } from "react";
import BookingForm from "../Bookings/BookingForm";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoomById } from "../Utils/APIFunctions";
import RoomCarousel from "../Common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div>
      <section className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-5">
            {isLoading ? (
              <p className="text-center text-warning">Loading room information...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <div className="card shadow-lg" style={{ borderRadius: "1rem", backgroundColor: "#111", color: "#FFC107" }}>
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room photo"
                  style={{ width: "100%", height: "200px", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center mb-3">{roomInfo.roomType}</h5>
                  <p className="text-center mb-3" style={{ fontSize: "1.1rem" }}>${roomInfo.roomPrice} / night</p>
                  <h6>Room Amenities</h6>
                  <ul className="list-unstyled mb-0">
                    <li><FaWifi /> Wifi</li>
                    <li><FaTv /> Netflix Premium</li>
                    <li><FaUtensils /> Breakfast</li>
                    <li><FaWineGlassAlt /> Mini bar refreshment</li>
                    <li><FaCar /> Car Service</li>
                    <li><FaParking /> Parking Space</li>
                    <li><FaTshirt /> Laundry</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <RoomCarousel />
      </section>
    </div>
  );
};

export default Checkout;
