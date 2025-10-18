import React, { useState } from "react";
import { loginUser } from "../Utils/APIFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const auth = useAuth();

  const handleInputChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(login);

      if (result && result.token) {
        auth.handleLogin(result.token);
        navigate(redirectUrl, { replace: true });
      } else {
        setErrorMessage("Login failed: Invalid credentials or server error.");
        setTimeout(() => setErrorMessage(""), 4000);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An unexpected error occurred";
      setErrorMessage(`Login failed: ${message}`);
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="col-md-5 p-4 rounded shadow"
        style={{ backgroundColor: "rgba(28, 28, 28, 0.9)", color: "#FFD700" }}
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
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email ID</label>
            <input
              type="text"
              name="email"
              className="form-control"
              style={{
                backgroundColor: "#2b2b2b",
                color: "#FFD700",
                borderColor: "#FFD700",
              }}
              value={login.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              style={{
                backgroundColor: "#2b2b2b",
                color: "#FFD700",
                borderColor: "#FFD700",
              }}
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#FFD700",
              color: "#1c1c1c",
              fontWeight: "bold",
              border: "none",
            }}
          >
            Login
          </button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#FFD700", fontWeight: "bold" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
