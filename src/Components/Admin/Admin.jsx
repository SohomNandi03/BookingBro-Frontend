import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section
      className="container mt-5"
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5 text-center"
        style={{
          background: 'linear-gradient(135deg, #fceabb, #f8b500)',
          color: '#222',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <h2
          className="mb-4 fw-bold"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: '2rem',
            textShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          <i className="bi bi-shield-lock me-2 text-dark"></i> Welcome to Admin Panel
        </h2>
        <hr style={{ borderColor: 'rgba(0,0,0,0.2)', marginBottom: '2rem' }} />
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link
            to="/add-room"
            className="btn fw-semibold rounded-pill shadow-sm"
            style={{
              background: '#222',
              color: '#FFD700',
              padding: '0.75rem 2rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#444'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#222'
              e.target.style.transform = 'scale(1)'
            }}
          >
            <i className="bi bi-houses me-2"></i> Manage Rooms
          </Link>

          <Link
            to="/existing-bookings"
            className="btn fw-semibold rounded-pill shadow-sm"
            style={{
              background: '#222',
              color: '#FFD700',
              padding: '0.75rem 2rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#444'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#222'
              e.target.style.transform = 'scale(1)'
            }}
          >
            <i className="bi bi-calendar-check me-2"></i> Manage Bookings
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Admin
