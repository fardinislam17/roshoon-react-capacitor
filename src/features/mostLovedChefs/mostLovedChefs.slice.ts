import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MostLovedChefs } from "./types";

export interface MostLovedChefsState {
  data: MostLovedChefs[];
}

const initialState: MostLovedChefsState = {
  data: [],
};

const mostLovedChefsSlice = createSlice({
  name: "mostLovedChefsList",
  initialState,
  reducers: {
    setMostLovedChefsList(state, action: PayloadAction<MostLovedChefs[]>) {
      state.data = action.payload;
    },
  },
});
