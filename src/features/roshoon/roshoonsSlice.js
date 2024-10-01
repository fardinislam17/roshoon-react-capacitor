import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  chefs: [], 
  filteredChefs: [], 
  search: '', 
};

const roshoonsSlice = createSlice({
  name: 'roshoonsSlice',
  initialState,
  reducers: {
    setChefs(state, action) {
      state.chefs = action.payload;
      state.filteredChefs = action.payload; 
    },
    searchChefsByAddress(state, action) {
      const address = action.payload.toLowerCase();
      state.filteredChefs = state.chefs.filter(chef =>
        chef.deliveryAreas.some(area => area.toLowerCase().includes(address))
      );
      state.search = action.payload; 
    },
   
    clearSearch(state) {
      state.filteredChefs = state.chefs; 
      state.search = ''; 
    },
  },
});

export const { setChefs, searchChefsByAddress, clearSearch } = roshoonsSlice.actions;
export default roshoonsSlice.reducer;