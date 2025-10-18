import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import moment from "moment";
import DateSlider from "./DateSlider";
import { getAvailableRooms } from "../Utils/APIFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";

const RoomSearch = () => {
  const [sliderDates, setSliderDates] = useState({ startDate: null, endDate: null });
  const [searchQuery, setSearchQuery] = useState({ checkInDate: "", checkOutDate: "", roomType: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderDateChange = (startDate, endDate) => {
    setSliderDates({ startDate, endDate });
    setSearchQuery({
      ...searchQuery,
      checkInDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      checkOutDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    });
    if (startDate && endDate) setErrorMessage("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);

    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErrorMessage("⚠️ Please enter valid dates");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErrorMessage("⚠️ Check-out date must be after check-in date");
      return;
    }

    setIsLoading(true);
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
      .then((data) => {
        setAvailableRooms(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("❌ Failed to fetch rooms. Make sure backend is running.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleClearSearch = () => {
    setSearchQuery({ checkInDate: "", checkOutDate: "", roomType: "" });
    setAvailableRooms([]);
  };

  return (
    <Container
      className="shadow-lg mt-n5 mb-5 p-4 rounded"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {/* Date Slider */}
      <DateSlider
        onDateChange={handleSliderDateChange}
        onFilterChange={handleSliderDateChange}
      />

      {/* Room Type Selector & Search Button */}
      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center g-3 mt-4">
          <Col xs={12} md={4}>
            <Form.Group controlId="roomType">
              <Form.Label className="text-warning fw-semibold">Room Type</Form.Label>
              <RoomTypeSelector
                handleRoomInputChange={handleInputChange}
                newRoom={searchQuery}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={2} className="d-flex align-items-end">
            <Button
              variant="warning"
              type="submit"
              className="fw-bold w-100 shadow-sm"
              style={{
                borderRadius: "0.75rem",
                padding: "0.6rem 1.5rem",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6c200")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffc107")}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Searching...
                </>
              ) : (
                <>🔍 Search</>
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Search Results */}
      <div className="mt-5" style={{ minHeight: "150px" }}>
        {isLoading ? (
          <p className="text-light text-center">🔎 Finding available rooms...</p>
        ) : availableRooms && availableRooms.length > 0 ? (
          <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
        ) : (
          <p className="text-secondary text-center">No rooms available for the selected dates and room type.</p>
        )}
        {errorMessage && <p className="text-danger fw-semibold mt-2 text-center">{errorMessage}</p>}
      </div>
    </Container>
  );
};

export default RoomSearch;
