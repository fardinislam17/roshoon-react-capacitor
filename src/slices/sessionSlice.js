import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, logout, setError, clearError } = sessionSlice.actions;
export const getCurrentUser = (state) => state.user;

export default sessionSlice;
