// src/components/ManageBookings.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]); // State for bookings
  const [error, setError] = useState(''); // State for errors
  const [editingBooking, setEditingBooking] = useState(null); // State for editing booking
  const [newSlot, setNewSlot] = useState(''); // State for new slot

  // Fetch user bookings from backend on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await API.get('/bookings'); // Fetch bookings from backend
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  // Handle slot update
  const handleUpdate = async (bookingId) => {
    try {
      const response = await API.put(`/bookings/${bookingId}/update`, { slot: newSlot });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? response.data.booking : booking
        )
      );
      setEditingBooking(null);
      setNewSlot('');
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Failed to update booking. Please try again.');
    }
  };

  // Handle booking cancellation
  const handleCancel = async (bookingId) => {
    try {
      const response = await API.put(`/bookings/${bookingId}/cancel`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? response.data.booking : booking
        )
      );
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Your Bookings</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length > 0 ? (
        <div className="list-group">
          {bookings.map((booking) => (
            <div key={booking._id} className="list-group-item">
              <h5>{booking.provider}</h5>
              <p>Slot: {new Date(booking.slot).toLocaleString()}</p>
              <p>Payment Status: {booking.paymentStatus}</p>
              <p>Amount Paid: ₹{booking.amountPaid}</p>

              {editingBooking === booking._id ? (
                <div className="mb-2">
                  <input
                    type="datetime-local"
                    className="form-control mb-2"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleUpdate(booking._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingBooking(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditingBooking(booking._id)}
                  >
                    Modify
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ManageBookings;
