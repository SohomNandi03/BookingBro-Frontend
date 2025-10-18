import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const RoomCard = ({ room }) => {
	return (
		<Col key={room.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/book-room/${room.id}`}>
							<Card.Img
								variant="top"
								src={
									room.photoBase64
										? `data:image/png;base64,${room.photoBase64}`
										: "/default-room.png" // fallback image in public folder
								}
								alt="Room Photo"
								style={{ width: "100%", maxWidth: "200px", height: "auto" }}
							/>
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="hotel-color">{room.roomType}</Card.Title>
						<Card.Title className="room-price">{room.roomPrice} / night</Card.Title>
						<Card.Text>Some room information goes here for the guest to read through</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link
							to={`/book-room/${room.id}`}
							className="btn btn-warning btn-lg px-4 shadow-sm fw-bold rounded-pill d-inline-flex align-items-center gap-2"
							style={{ color: "#000" }} // black text for better contrast
						>
							<i className="bi bi-calendar-check"></i> {/* Bootstrap Icon */}
							Book Now
						</Link>
					</div>
					




				</Card.Body>
			</Card>
		</Col>
	)
}

export default RoomCard