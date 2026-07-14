import type { RootState } from "@app/providers/store";

export const selectRegistrationOpen = (state: RootState) =>
  state.registration.isOpen;
