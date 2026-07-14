import type { RootState } from "@app/providers/store";

export const selectServiceData = (state: RootState) => state.serviceData.data;

export const selectRulesLink = (state: RootState) =>
  state.serviceData.data?.rules_link || "#";

export const selectPdLink = (state: RootState) =>
  state.serviceData.data?.pd_link || "#";
