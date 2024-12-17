import { createSlice } from '@reduxjs/toolkit';
import { ROSHOON_ACCESS_TOKEN } from 'src/app/constants';

const initialState = {
  user: null,
  zip_code: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setZipCode: (state, action) => {
      state.zip_code = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(ROSHOON_ACCESS_TOKEN);
    },
  },
});

export const { setUser, logout, setZipCode } = sessionSlice.actions;
export const getCurrentUser = (state) => state.session.user;
export const getZipCode = (state) => state.session.zip_code;

export default sessionSlice;
