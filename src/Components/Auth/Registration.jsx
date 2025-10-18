import React, { useState } from "react";
import { registerUser } from "../Utils/APIFunctions";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setRegistration({ ...registration, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registration);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        className="col-md-6 p-4 rounded shadow"
        style={{
          backgroundColor: "rgba(28, 28, 28, 0.85)",
          color: "#FFD700",
          boxShadow: "0 0 20px #FFD700",
          border: "1px solid #FFD700",
        }}
      >
        {errorMessage && (
          <p
            className="alert"
            style={{ backgroundColor: "#FFD700", color: "#1c1c1c" }}
          >
            {errorMessage}
          </p>
        )}
        <h2 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control glow-input"
                value={registration.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control glow-input"
                value={registration.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control glow-input"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control glow-input"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn w-100 glow-btn">
            Register
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#FFD700", fontWeight: "bold" }}>
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .glow-input {
            background-color: #1c1c1c;
            color: #FFD700;
            border: 2px solid #FFD700;
            border-radius: 6px;
            padding: 10px;
            transition: all 0.3s ease;
          }
          .glow-input:focus {
            outline: none;
            box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
            border-color: #FFD700;
          }
          .glow-btn {
            background-color: #FFD700;
            color: #1c1c1c;
            font-weight: bold;
            border: none;
            border-radius: 6px;
            padding: 10px 0;
            transition: all 0.3s ease;
          }
          .glow-btn:hover {
            box-shadow: 0 0 15px #FFD700, 0 0 30px #FFD700;
            transform: scale(1.05);
          }
        `}
      </style>
    </section>
  );
};

export default Registration;
