import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticationType: '', // roshoon, google, facebook 
  user: null,
  userApiData: null,
  userType: '', // (empty string), 'chef', 'user'
  error: null, // Added for error handling
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUserApiData: (state, action) => {
      state.userApiData = action.payload;
    },
    setAuthenticationType: (state, action) => {
      const authType = action.payload;
      if (
        authType === 'roshoon' ||
        authType === 'google' ||
        authType === 'facebook'
      ) {
        state.authenticationType = authType;
      } else {
        state.authenticationType = ''; // Reset to empty if invalid
      }
    },
    setUserType: (state, action) => {
      const authType = action.payload;
      if (authType === 'chef' || authType === 'user') {
        state.userType = authType;
      } else {
        state.userType = ''; // Reset to empty if invalid
      }
    },
    login: (state, action) => {
      // Assume action.payload contains user data on successful login
      state.user = action.payload.user; // Set user info from payload
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
  setUserApiData,
  setAuthenticationType,
  setUserType,
  login,
  logout,
  loginFailed,
  clearError,
} = sessionSlice.actions;

export default sessionSlice;
