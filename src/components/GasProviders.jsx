// src/components/GasProviders.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const GasProviders = () => {
  const [providers, setProviders] = useState([]); // State for gas providers
  const [error, setError] = useState(''); // State for errors

  // Fetch gas providers from backend on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await API.get('/providers');
        setProviders(response.data);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load gas providers. Please try again.');
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gas Providers</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {providers.map((provider) => (
          <div key={provider._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{provider.name}</h5>
                <p className="card-text">{provider.description}</p>
                <p className="card-text">Location: {provider.location}</p>
                <p className="card-text">Type: {provider.type}</p>
                <p className="card-text">Rating: {provider.rating}</p>
                {/* Link to booking page with selected provider as URL parameter */}
                <Link to={`/booking?provider=${encodeURIComponent(provider.name)}`} className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GasProviders;
