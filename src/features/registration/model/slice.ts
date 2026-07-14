import { createSlice } from "@reduxjs/toolkit";

interface RegistrationState {
  isOpen: boolean;
}

const initialState: RegistrationState = {
  isOpen: false,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    openRegistration(state) {
      state.isOpen = true;
    },
    closeRegistration(state) {
      state.isOpen = false;
    },
  },
});

export const { openRegistration, closeRegistration } =
  registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
