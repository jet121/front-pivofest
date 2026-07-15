import { api, API_ROUTES, defaultOptions, toForm } from "@shared/api";

export interface Transaction {
  id: number;
  transaction_type_id: number;
  tr_value: number;
  code: string | null;
  activated: 0 | 1;
  created: string;
  receipt_id: number | null;
  // Статус модерации чека (если бэкенд его отдаёт).
  status?: string;
  title?: string;
  event?: { title?: string };
  place?: { title?: string };
  bonus?: { title?: string };
}

export interface GetTransactionsParams {
  auth_key: string;
  user_id: number;
  page?: number;
}

export const getTransactions = async (
  params: GetTransactionsParams,
): Promise<Transaction[]> => {
  const { data } = await api.post<Transaction[]>(
    API_ROUTES.TRANSACTIONS,
    toForm({
      ...defaultOptions(),
      auth_key: params.auth_key,
      user_id: params.user_id,
      page: params.page ?? 0,
    }),
  );
  return data;
};
