// App.jsx
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Rooms
import AddRoom from './Components/Room/AddRoom';
import ExistingRooms from './Components/Room/ExistingRooms';
import EditRoom from './Components/Room/EditRoom';
import RoomListing from './Components/Room/RoomListing';

// Bookings
import BookingForm from './Components/Bookings/BookingForm';
import BookingSuccess from './Components/Bookings/BookingSuccess';
import Bookings from './Components/Bookings/BookingSummary';
import FindBooking from './Components/Bookings/FindBooking';
import Checkout from './Components/Bookings/CheckOut';

// Auth
import { AuthProvider } from './Components/Auth/AuthProvider';
import Login from './Components/Auth/Login';
import Registration from './Components/Auth/Registration';
import Profile from './Components/Auth/Profile';
import RequireAuth from './Components/Auth/RequireAuth';

// Layout
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';

// Home & Admin
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';

function App() {
  return (
    <AuthProvider>
      <div className="app-content d-flex flex-column min-vh-100 bg-dark text-light">
        <Router>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/book-room/:roomId" element={<BookingForm />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />

              {/* Protected routes */}
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <RequireAuth>
                    <Bookings />
                  </RequireAuth>
                }
              />

              {/* Admin routes */}
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/admin" element={<Admin />} />

              {/* Checkout */}
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
