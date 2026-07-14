import { api, API_ROUTES, defaultOptions, toForm } from "@shared/api";

export interface Bonus {
  id: number;
  code: string | null;
  title: string;
  bonus: number;
  activated: number;
  created: string;
  period_from?: string;
  period_to?: string;
  tr_num?: string;
}

export interface GetBonusesParams {
  auth_key: string;
  user_id: number;
  page?: number;
  /** activated=1 — активные промокоды. */
  activated?: number;
}

export const getBonuses = async (
  params: GetBonusesParams,
): Promise<Bonus[]> => {
  const { data } = await api.post<Bonus[]>(
    API_ROUTES.TRANSACTION_BONUSES,
    toForm({
      ...defaultOptions(),
      auth_key: params.auth_key,
      user_id: params.user_id,
      page: params.page ?? 1,
      activated: params.activated ?? 1,
    }),
  );
  return data;
};
