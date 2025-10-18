import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Parallax = () => {
    return (
        <div
            className="parallax mb-5 d-flex align-items-center justify-content-center text-light"
            style={{
                backgroundImage: "url('https://source.unsplash.com/1920x1080/?luxury-hotel,travel')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "60vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Overlay for dark effect */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(2px)",
                }}
            ></div>

            <Container
                className="text-center px-5 py-5"
                style={{ position: "relative", zIndex: 2 }}
            >
                <div className="animated-texts bounceIn">
                    <h1 className="fw-bold display-4 mb-3 text-gradient">
                        Experience the Best Hospitality at{" "}
                        <span className="hotel-color">BookingBro</span>
                    </h1>
                    <h3 className="fst-italic text-light">
                        We offer premium comfort and world-class services for all your needs.
                    </h3>

                    {/* Call-to-action button */}
                    <Link
                        to="/existing-rooms"   // Updated route
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

                </div>
            </Container>
        </div>
    )
}

export default Parallax
