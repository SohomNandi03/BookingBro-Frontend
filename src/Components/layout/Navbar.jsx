import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Dummy user info (replace with real user data from auth context/state)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 shadow-lg sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-warning fs-4">
          <i className="bi bi-building-check me-2"></i> BookingBro
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll gap-3">
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold px-3 rounded hover-nav"
                to="/browse-all-rooms"
              >
                <i className="bi bi-door-open me-1"></i> Browse All Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold px-3 rounded hover-nav"
                to="/admin"
              >
                <i className="bi bi-gear me-1"></i> Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold px-3 rounded hover-nav"
                to="/find-booking"
              >
                <i className="bi bi-search-heart me-1"></i> Find My Booking
              </NavLink>
            </li>

            {/* Account Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-warning fw-bold text-dark px-3 rounded-pill dropdown-toggle"
                id="accountDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i> Account
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-lg"
                aria-labelledby="accountDropdown"
                style={{ minWidth: "200px", backgroundColor: "#1c1c1c" }}
              >
                <li className="px-3 py-2 border-bottom" style={{ color: "#ffc107" }}>
                  <strong>{user.name}</strong>
                  <br />
                  <small>{user.email}</small>
                </li>
                <li>
                  <Link className="dropdown-item text-warning" to="/account/profile">
                    <i className="bi bi-person me-1"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-warning" to="/account/bookings">
                    <i className="bi bi-bookmark-check me-1"></i> My Bookings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-warning" to="/account/settings">
                    <i className="bi bi-gear me-1"></i> Settings
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Inline CSS for underline hover */}
      <style>
        {`
          .hover-nav {
            position: relative;
            transition: color 0.3s ease;
          }
          .hover-nav::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #ffc107;
            transition: width 0.3s;
          }
          .hover-nav:hover::after {
            width: 100%;
          }
          .hover-nav:hover {
            color: #ffc107 !important;
          }
          .dropdown-item:hover {
            background-color: #333 !important;
            color: #ffc107 !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
