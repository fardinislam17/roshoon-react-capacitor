import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticationType: null, //null, 'chef', 'user'
  user: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticationType: (state, action) => {
      if(action.payload === 'chef' || action.payload === 'user'){
        state.authenticationType = action.payload;
      }else{
        state.authenticationType = null;
      }
    },
  },
});
export const { setUser, setAuthenticationType } = sessionSlice.actions;

export default sessionSlice;
