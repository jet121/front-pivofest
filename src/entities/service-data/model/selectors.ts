import type { RootState } from "@app/providers/store";

export const selectServiceData = (state: RootState) => state.serviceData.data;

/** Условия акции: параметр из API, иначе — статический PDF. */
export const selectRulesLink = (state: RootState) =>
  state.serviceData.data?.rules_link || "https://jetcrm.ru/craft/rules.pdf";

/** Политика обработки персональных данных: из API, иначе — статический PDF. */
export const selectPdLink = (state: RootState) =>
  state.serviceData.data?.pd_link || "https://jetcrm.ru/craft/polit.pdf";
