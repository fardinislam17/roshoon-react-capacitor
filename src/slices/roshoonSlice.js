import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

const roshoonSlice = createSlice({
  name: 'roshoon',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setChefs(state, action) {
      state.chefs = action.payload;
      state.filteredChefs = action.payload;
    },
    searchChefsByAddress(state, action) {
      const address = action.payload.toLowerCase();
      state.filteredChefs = state.chefs.filter((chef) =>
        chef.deliveryAreas.some((area) => area.toLowerCase().includes(address))
      );
      state.search = action.payload;
    },
    clearSearch(state) {
      state.filteredChefs = state.chefs;
      state.search = '';
    },
  },
});

export const { setChefs, searchChefsByAddress, clearSearch } =
  roshoonSlice.actions;
export default roshoonSlice;
