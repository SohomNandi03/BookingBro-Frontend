import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);

    if (!selectedRoomType) {
      setFilteredData(data);
    } else {
      const filteredRooms = data.filter((room) =>
        room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
      );
      setFilteredData(filteredRooms);
    }
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = [...new Set(data.map((room) => room.roomType))];

  return (
    <div className="card shadow-lg p-3 mb-4 bg-dark text-light border-0 rounded-4">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center gap-2 mb-3">
          <FaFilter className="text-warning" /> Filter Rooms By Type
        </h5>

        <div className="d-flex flex-wrap align-items-center gap-3">
          <select
            className="form-select bg-dark text-light border-warning rounded-pill shadow-sm"
            value={filter}
            onChange={handleSelectChange}
            style={{ maxWidth: "300px" }}
          >
            <option value="">All Room Types</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            className="btn btn-outline-warning rounded-pill px-3 d-flex align-items-center gap-2"
            type="button"
            onClick={clearFilter}
          >
            <FaTimes /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;

