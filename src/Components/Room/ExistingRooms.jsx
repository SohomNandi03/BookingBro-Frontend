import React, { useState, useEffect } from "react";
import { deleteRoom, getAllRooms } from "../Utils/APIFunctions";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import RoomFilter from "../Common/RoomFilter";
import RoomPaginator from "../Common/RoomPaginator";
import EditRoom from "./EditRoom"; // make sure this import exists

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:9192/rooms/all");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Backend did not return an array of rooms");
        }
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was Deleted`);
        const updatedRooms = await getAllRooms();
        setRooms(updatedRooms);
        setFilteredRooms(updatedRooms);
      } else {
        console.error(`Error Deleting Room : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowEditModal(true);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4 bg-dark text-light p-4 rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <h2 className="fw-bold text-light">Available Rooms</h2>
        <Link
          to="/add-room"
          className="btn btn-success d-flex align-items-center gap-2 shadow px-3 py-2 rounded-pill"
          style={{ textDecoration: "none" }}
        >
          <FaPlus size={18} />
          <span>Add Room</span>
        </Link>
      </div>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />

      {isLoading ? (
        <p className="text-center mt-4">Loading rooms...</p>
      ) : (
        <div className="row">
          {currentRooms.length > 0 ? (
            currentRooms.map((room) => (
              <div className="col-md-3 mb-4" key={room.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3 bg-secondary text-light">
                  {room.photo ? (
                    <img
                      src={`data:image/jpeg;base64,${room.photo}`}
                      className="card-img-top rounded-top"
                      alt={room.roomType || "Room"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#343a40",
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                        color: "#ccc",
                      }}
                    >
                      No Photo
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold text-info">
                      {room.roomType || "Unknown"}
                    </h5>
                    <p className="card-text mb-1">
                      Price:{" "}
                      <strong className="text-warning">
                        ${room.roomPrice || "N/A"}
                      </strong>
                    </p>
                    <p className="card-text">
                      Status:{" "}
                      {room.booked ? (
                        <span className="badge bg-danger">Booked</span>
                      ) : (
                        <span className="badge bg-success">Available</span>
                      )}
                    </p>

                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleEdit(room)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(room.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms found.</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <RoomPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {showEditModal && editingRoom && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow-lg rounded-4 border-0 bg-dark text-light">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Room</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <EditRoom
                  roomData={editingRoom}
                  closeModal={() => setShowEditModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingRooms;
