import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // ✅ Predefined Room Types
  const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Presidential"]

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target
    if (name === "roomPrice") {
      if (!isNaN(value) && value >= 0) {
        setNewRoom({ ...newRoom, [name]: value })
      } else {
        setNewRoom({ ...newRoom, [name]: "" })
      }
    } else {
      setNewRoom({ ...newRoom, [name]: value })
    }
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setNewRoom({ ...newRoom, photo: selectedImage })
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("file", newRoom.photo)
      formData.append("roomType", newRoom.roomType)
      formData.append("roomPrice", newRoom.roomPrice)

      const response = await axios.post(
        "http://localhost:9192/rooms/add/new-room",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      setSuccessMessage("✅ Room added successfully!")
      console.log(response.data)

      // Reset form
      setNewRoom({ photo: null, roomType: "", roomPrice: "" })
      setImagePreview("")
    } catch (error) {
      setErrorMessage("❌ Error adding room: " + error.message)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="text-center mb-4 fw-bold text-primary">
              <i className="bi bi-door-open-fill me-2"></i> Add New Room
            </h2>

            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="needs-validation">
              {/* Room Type Selector */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Room Type</label>
                <select
                  name="roomType"
                  className="form-select"
                  value={newRoom.roomType}
                  onChange={handleRoomInputChange}
                  required
                >
                  <option value="">-- Select Room Type --</option>
                  {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Price */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Room Price ($)</label>
                <input
                  type="number"
                  name="roomPrice"
                  className="form-control"
                  placeholder="Enter Room Price"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                  min="0"
                  required
                />
              </div>

              {/* Room Photo */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Upload Photo</label>
                <input
                  type="file"
                  name="photo"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>

              {imagePreview && (
                <div className="text-center mb-3">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="img-thumbnail rounded-3 shadow-sm"
                    width="220"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success fw-semibold">
                  <i className="bi bi-plus-circle me-1"></i> Add Room
                </button>
                <Link
                  to="/existing-rooms"
                  className="btn btn-outline-info fw-semibold"
                >
                  <i className="bi bi-collection me-1"></i> Back to Existing Rooms
                </Link>
                <Link to="/" className="btn btn-warning fw-semibold">
                  <i className="bi bi-house-door me-1"></i> Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRoom
