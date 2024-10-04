import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  chefs: [
    {
      id: 1,
      name: 'Sam houdini',
      deliveryAreas: ['Toronto', 'Mississauga'],
    },
    {
      id: 2,
      name: 'Ahmad bin ladin',
      deliveryAreas: ['Toronto', 'Brampton'],
    },
    {
      id: 3,
      name: 'John Doe',
      deliveryAreas: ['Toronto', 'Scarborough'],
    }
  ], 
  filteredChefs: [], 
  search: '', 
};

const roshoonSlice = createSlice({
  name: 'roshoon',
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

export const { setChefs, searchChefsByAddress, clearSearch } = roshoonSlice.actions;
export default roshoonSlice;