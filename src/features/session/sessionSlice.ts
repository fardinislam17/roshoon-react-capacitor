import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "src/app/store";

export interface User {
  email: string;
  display_name: string;
}
export interface Session {
  user: User | null;
}
const initialState: Session = {
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});
export const { setUser } = sessionSlice.actions;

export const selectUser = (state: RootState) => state.session.user;
