import React, { useState, useEffect } from "react"
import MainHeader from "../layout/MainHeader"
import HotelService from "../Common/HotelService"
import Parallax from "../Common/Parallax"
import RoomCarousel from "../Common/RoomCarousel"
import RoomSearch from "../Common/RoomSearch"
import { useLocation } from "react-router-dom"

const Home = () => {
  const location = useLocation()
  const message = location.state && location.state.message

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  return (
    <section
      className="text-light min-vh-100"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        scrollBehavior: "smooth",
        background: "linear-gradient(135deg, #0f0f0f, #1e1e1e, #2a2a2a)",
      }}
    >
      {/* Display message if exists */}
      {message && (
        <p
          className="px-5 py-2 rounded shadow-sm text-center animate__animated animate__fadeInDown"
          style={{
            fontSize: "1.1rem",
            fontWeight: "500",
            background: "rgba(255, 193, 7, 0.1)",
            color: "#FFC107",
            border: "1px solid #FFC107",
            backdropFilter: "blur(6px)",
          }}
        >
          {message}
        </p>
      )}

      {/* Show logged-in user */}
      {currentUser && (
        <h6
          className="text-center my-3 p-2 rounded shadow-sm animate__animated animate__fadeInUp"
          style={{
            fontWeight: "600",
            letterSpacing: "0.5px",
            background: "rgba(25, 135, 84, 0.15)",
            color: "#28a745",
            border: "1px solid #28a745",
            backdropFilter: "blur(6px)",
          }}
        >
          ✅ You are logged in as {currentUser}
        </h6>
      )}

      {/* Main header with Typed.js */}
      <MainHeader />

      <div className="container my-5">
        {/* Room search */}
        <div className="mb-5 animate__animated animate__fadeInUp">
          <RoomSearch />
        </div>

        {/* Room carousel */}
        <div className="my-5">
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              fontSize: "2.7rem",
              letterSpacing: "1px",
              color: "#FFC107",
              textShadow: "0px 0px 10px rgba(255, 193, 7, 0.7)",
            }}
          >
            ✨ Browse Our Rooms ✨
          </h2>
          <div className="rounded shadow-lg p-3 bg-dark bg-opacity-50 backdrop-blur-lg">
            <RoomCarousel />
          </div>
        </div>

        {/* Parallax section */}
        <div className="my-5">
          <Parallax />
        </div>

        {/* Hotel services */}
        <div className="my-5">
          <div className="rounded p-4 shadow-lg bg-dark bg-opacity-50 backdrop-blur-lg">
            <HotelService />
          </div>
        </div>
      </div>

      {/* Modern UI styling */}
      <style>
        {`
          h2.text-warning {
            transition: transform 0.3s ease, text-shadow 0.3s ease;
          }
          h2.text-warning:hover {
            transform: scale(1.05);
            text-shadow: 0px 0px 20px rgba(255, 215, 0, 0.9);
          }
          .btn-custom {
            background: #FFC107;
            color: #000;
            font-weight: 600;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
          }
          .btn-custom:hover {
            background: #e0a800;
            transform: translateY(-2px);
            box-shadow: 0px 4px 12px rgba(255, 193, 7, 0.5);
          }
        `}
      </style>
    </section>
  )
}

export default Home
