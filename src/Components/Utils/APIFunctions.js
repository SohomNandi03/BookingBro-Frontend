import axios from "axios";

// -------------------- AXIOS INSTANCE --------------------
export const api = axios.create({
  baseURL: "http://localhost:9192",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- AUTH HELPERS --------------------
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// -------------------- ROOM FUNCTIONS --------------------

// Add a new room
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  if (photo) formData.append("file", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData, {
      headers: getAuthHeaders(),
    });
    return response.status === 200;
  } catch (error) {
    throw new Error("Error adding room: " + (error.response?.data || error.message));
  }
}

// Get all room types
export const getRoomTypes = async () => {
  try {
    const response = await api.get("/rooms/types", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error(error.response?.data || "Failed to fetch room types");
  }
};

// Get all rooms
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch rooms");
  }
}

// Delete a room by ID
export async function deleteRoom(roomId) {
  try {
    await api.delete(`/rooms/delete/room/${roomId}`, { headers: getAuthHeaders() });
    return true;
  } catch (error) {
    throw new Error(error.response?.data || "Error deleting room");
  }
}

// Update a room
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  if (roomData.photo instanceof File) formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to update room");
  }
}

// Get room by ID
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/room/${roomId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error fetching room");
  }
}

// Get available rooms by date and type
export const getAvailableRooms = async (checkInDate, checkOutDate, roomType) => {
  try {
    const response = await api.get("/rooms/available-rooms", {
      headers: getAuthHeaders(),
      params: { checkInDate, checkOutDate, roomType },
    });
    return response.data;
  } catch (error) {
    if (error.response) throw new Error(error.response.data?.message || error.message);
    if (error.request) throw new Error("No response from server. Is backend running?");
    throw new Error(`Error fetching available rooms: ${error.message}`);
  }
};

// -------------------- BOOKING FUNCTIONS --------------------
let isBooking = false;

export async function bookRoom(roomId, booking) {
  if (isBooking) return;
  isBooking = true;

  try {
    if (!booking.guestFullName || !booking.guestEmail || !booking.checkInDate || !booking.checkOutDate) {
      throw new Error("All guest and date fields are required");
    }

    const payload = {
      guestFullName: booking.guestFullName,
      guestEmail: booking.guestEmail,
      checkInDate: new Date(booking.checkInDate).toISOString().split("T")[0],
      checkOutDate: new Date(booking.checkOutDate).toISOString().split("T")[0],
      numOfAdults: parseInt(booking.numOfAdults) || 0,
      numOfChildren: parseInt(booking.numOfChildren) || 0,
    };

    const response = await api.post(`/bookings/room/${roomId}/booking`, payload, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    if (error.response?.data) throw new Error(error.response.data.message || JSON.stringify(error.response.data));
    throw new Error(`Error booking room: ${error.message}`);
  } finally {
    isBooking = false;
  }
}

export async function getAllBookings() {
  try {
    const response = await api.get("/bookings/all-bookings", { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(`/bookings/confirmation/${confirmationCode}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/booking/${bookingId}/delete`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// -------------------- USER FUNCTIONS --------------------

// Register user
export async function registerUser(registration) {
  try {
    const response = await api.post("/api/auth/register", registration);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

// Login user
export async function loginUser({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    if (response.status >= 200 && response.status < 300) {
      // Backend returns token and roles
      const { token, email: userEmail, roles } = response.data;
      localStorage.setItem("token", token); // save token
      return { token, email: userEmail || email, roles };
    }
    return null;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return null;
  }
}

// Get user profile
export async function getUserProfile(userId) {
  try {
    const response = await api.get(`/api/users/profile/${userId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Delete user
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/api/users/delete/${userId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

// Get user by ID
export async function getUser(userId) {
  try {
    const response = await api.get(`/api/users/${userId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

// Get bookings by user ID
export async function getBookingsByUserId(userId) {
  try {
    const response = await api.get(`/api/bookings/user/${userId}/bookings`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch bookings: " + (error.response?.data?.message || error.message));
  }
}
