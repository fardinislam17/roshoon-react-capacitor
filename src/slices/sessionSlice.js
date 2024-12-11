import { createSlice } from '@reduxjs/toolkit';
import { ROSHOON_ACCESS_TOKEN } from 'src/app/constants';

const initialState = {
  user: null,
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
      localStorage.removeItem(ROSHOON_ACCESS_TOKEN);
    },
  },
});

export const { setUser, logout } = sessionSlice.actions;
export const getCurrentUser = (state) => state.session.user;

export default sessionSlice;
