// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/register', { username, email, password });
      const { user, token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { user, token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoggedIn: !!localStorage.getItem('user'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
