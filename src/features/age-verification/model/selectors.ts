import type { RootState } from '@app/providers/store';

export const selectAgeStatus = (state: RootState) =>
  state.ageVerification.status;
