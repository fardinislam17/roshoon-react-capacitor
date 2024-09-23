import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoshoonDetails = {
  mostLovedChefs: [];
};

export const initialState: RoshoonDetails[] = [];

const roshoonsSlice = createSlice({
  name: "roshoonsSlice",
  initialState,
  reducers: {},
});

export default roshoonsSlice;
