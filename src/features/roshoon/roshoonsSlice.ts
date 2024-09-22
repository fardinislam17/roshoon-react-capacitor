import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

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
