// src/components/Booking.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Redux hook for authentication state
import API from '../api';

const Booking = () => {
  const { isLoggedIn } = useSelector((state) => state.user); // Get login state from Redux
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]); // State for gas providers
  const [selectedProvider, setSelectedProvider] = useState(''); // State for selected provider
  const [availableSlots, setAvailableSlots] = useState([]); // State for available slots
  const [selectedSlot, setSelectedSlot] = useState(''); // State for selected slot
  const [amount, setAmount] = useState(50); // Set booking amount for demo purposes
  const [error, setError] = useState(''); // State for errors
  const [success, setSuccess] = useState(''); // State for success messages

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { message: 'Please log in or register to book a slot.' } });
    }
  }, [isLoggedIn, navigate]);

  // Get the provider parameter from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const providerFromURL = queryParams.get('provider');

  // Fetch gas providers from backend on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await API.get('/providers');
        setProviders(response.data);

        // Preselect the provider if passed in the URL
        if (providerFromURL) {
          setSelectedProvider(providerFromURL);
          const providerData = response.data.find(provider => provider.name === providerFromURL);
          if (providerData) {
            setAvailableSlots(providerData.availableSlots);
          }
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load gas providers. Please try again.');
      }
    };

    fetchProviders();
  }, [providerFromURL]);

  // Handle provider selection change
  const handleProviderChange = (e) => {
    const selectedProviderName = e.target.value;
    setSelectedProvider(selectedProviderName);

    // Find the selected provider and update available slots
    const providerData = providers.find(provider => provider.name === selectedProviderName);
    if (providerData) {
      setAvailableSlots(providerData.availableSlots);
    } else {
      setAvailableSlots([]);
    }
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    try {
      // Create an order in the backend
      const orderResponse = await API.post('/create-order', { amount });
      const { id: order_id, amount: order_amount, currency } = orderResponse.data;

      // Initialize Razorpay options
      const options = {
        key: 'rzp_test_E0llQrnBZCenIL', // Replace with your Razorpay Test Key ID
        amount: order_amount,
        currency: currency,
        name: 'Gas Booking App',
        description: 'Booking Payment',
        order_id: order_id,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          if (razorpay_payment_id) {
            // Create booking after successful payment
            await API.post('/bookings/create', {
              provider: selectedProvider,
              slot: selectedSlot,
              paymentStatus: 'completed',
              amountPaid: amount,
            });
            setSuccess('Booking created and payment successful!');
            setError('');
          } else {
            setError('Payment failed. Please try again.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Gas Booking Address',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Error during payment:', err);
      setError('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book a Slot with Razorpay (Test Mode)</h2>

      {/* Display success or error messages */}
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Dropdown for selecting provider */}
        <div className="mb-3">
          <label className="form-label">Select Provider</label>
          <select
            className="form-select"
            value={selectedProvider}
            onChange={handleProviderChange}
          >
            <option value="">Select a provider</option>
            {providers.map((provider) => (
              <option key={provider._id} value={provider.name}>
                {provider.name} - {provider.location}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for selecting available slot */}
        {availableSlots.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Select Available Slot</label>
            <select
              className="form-select"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">Select a slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {new Date(slot).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={handlePayment}>
          Pay ₹{amount} & Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
