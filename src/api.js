// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dhatchanandcogasbooking.onrender.com/api', // Update this to match your backend URL
});

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;
