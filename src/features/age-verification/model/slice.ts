import { createSlice } from '@reduxjs/toolkit';
import type { AgeVerificationState } from './types';
import { readAgeStatus, writeAgeStatus } from '../lib/storage';

const initialState: AgeVerificationState = {
  status: readAgeStatus(),
};

export const ageVerificationSlice = createSlice({
  name: 'ageVerification',
  initialState,
  reducers: {
    confirmAdult(state) {
      state.status = 'confirmed';
      writeAgeStatus('confirmed');
    },
    declineAdult(state) {
      state.status = 'declined';
      writeAgeStatus('declined');
    },
    resetAgeStatus(state) {
      state.status = 'pending';
      writeAgeStatus('pending');
    },
  },
});

export const { confirmAdult, declineAdult, resetAgeStatus } =
  ageVerificationSlice.actions;

export const ageVerificationReducer = ageVerificationSlice.reducer;
