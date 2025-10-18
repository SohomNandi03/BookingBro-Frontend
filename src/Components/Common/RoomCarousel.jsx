import React, { useState, useEffect } from "react";
import { getAllRooms } from "../Utils/APIFunctions";
import { Link, useNavigate } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    getAllRooms()
      .then((data) => {
        if (data && data.length > 0) setRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading) return <div className="mt-5">Loading rooms...</div>;
  if (errorMessage) return <div className="text-danger mt-5">{errorMessage}</div>;
  if (!rooms.length) return <div className="mt-5">No rooms available.</div>;

  const customPrev = <span className="carousel-control-prev-icon" style={{ backgroundColor: "#ffc107", borderRadius: "50%", padding: "10px" }}></span>;
  const customNext = <span className="carousel-control-next-icon" style={{ backgroundColor: "#ffc107", borderRadius: "50%", padding: "10px" }}></span>;

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Container>
        <Carousel indicators={false} prevIcon={customPrev} nextIcon={customNext}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} xs={12} md={6} lg={3} className="mb-4">
                    <Card className="card-hover shadow-sm border-0">
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={room.photoBase64 ? `data:image/png;base64,${room.photoBase64}` : "/default-room.png"}
                          alt="Room Photo"
                          style={{ height: "200px", objectFit: "cover", borderRadius: "0.5rem" }}
                        />
                      </Link>
                      <Card.Body className="text-center">
                        <Card.Title>{room.roomType}</Card.Title>
                        <Card.Title>${room.roomPrice}/night</Card.Title>
                        <Link to={`/book-room/${room.id}`} className="btn btn-warning btn-sm fw-bold">
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
