// src/components/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../features/userSlice'; // Redux action for login

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for errors
  const message = location.state?.message; // Get the message from navigation state

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Dispatch login action to Redux
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) {
        setError('');
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>

      {/* Display the redirect message if present */}
      {message && <div className="alert alert-warning">{message}</div>}

      {/* Display error message if login fails */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
