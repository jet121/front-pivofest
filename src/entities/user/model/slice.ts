import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "./types";
import { readUser, writeUser } from "./storage";

const initialState: UserState = {
  user: readUser(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      writeUser(action.payload);
    },
    clearUser(state) {
      state.user = null;
      writeUser(null);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
