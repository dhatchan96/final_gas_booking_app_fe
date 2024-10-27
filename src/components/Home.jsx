// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
  const { user } = useSelector((state) => state.user); // Get the logged-in user's data from Redux
  const [providers, setProviders] = useState([]); // State for gas providers
  const [filteredProviders, setFilteredProviders] = useState([]); // State for filtered providers
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [error, setError] = useState(''); // State for errors

  // Fetch gas providers from backend on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await API.get('/providers');
        setProviders(response.data);
        setFilteredProviders(response.data);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load gas providers. Please try again.');
      }
    };

    fetchProviders();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter providers based on search term
    const filtered = providers.filter((provider) =>
      provider.name.toLowerCase().includes(value)
    );
    setFilteredProviders(filtered);
  };

  return (
    <div className="container mt-5">
      {/* Greeting message with user's name */}
      <div className="alert alert-primary text-center" role="alert">
        <h3>Welcome back, {user ? user.username : 'Guest'}!</h3>
        <p>Find and book a gas provider of your choice.</p>
      </div>

      <h2 className="mb-4 text-center">Available Gas Providers</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search bar for filtering providers */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search for a gas provider..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* List of gas providers */}
      <div className="row">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div key={provider._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{provider.name}</h5>
                  <p className="card-text">{provider.description}</p>
                  <p className="card-text">
                    <strong>Location:</strong> {provider.location}
                  </p>
                  <p className="card-text">
                    <strong>Type:</strong> {provider.type}
                  </p>
                  <p className="card-text">
                    <strong>Rating:</strong> {provider.rating} / 5
                  </p>
                  <Link to={`/booking?provider=${encodeURIComponent(provider.name)}`} className="btn btn-primary mt-2">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No gas providers found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
