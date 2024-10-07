import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticationType: '', // '' (empty string), 'chef', 'user'
  user: null,
  error: null, // Added for error handling
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticationType: (state, action) => {
      const authType = action.payload;
      if (authType === 'chef' || authType === 'user') {
        state.authenticationType = authType;
      } else {
        state.authenticationType = ''; // Reset to empty if invalid
      }
    },
    login: (state, action) => {
      // Assume action.payload contains user data on successful login
      state.user = action.payload.user; // Set user info from payload
      state.authenticationType = action.payload.type; // Set the authentication type
    },
    logout: (state) => {
      state.user = null;
      state.authenticationType = ''; 
    },
    loginFailed: (state, action) => {
      state.error = action.payload; 
    },
    clearError: (state) => {
      state.error = null; 
    },
  },
});

export const {
  setUser,
  setAuthenticationType,
  login,
  logout,
  loginFailed,
  clearError,
} = sessionSlice.actions;

export default sessionSlice;
