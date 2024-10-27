// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GasProviders from './components/GasProviders';
import Booking from './components/Booking';
import Payment from './components/Payment';
import ManageBookings from './components/ManageBookings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/providers" element={<GasProviders />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
