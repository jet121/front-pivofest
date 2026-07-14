import { api, defaultOptions, toForm } from "@shared/api";

export interface Account {
  id: number;
  fullname: string;
  msisdn: string;
  email: string;
  balance: number;
  bonus_new: number;
}

export const getAccount = async (params: {
  auth_key: string;
  user_id: number;
}): Promise<Account> => {
  const { data } = await api.post<Account>(
    "user/account",
    toForm({
      ...defaultOptions(),
      auth_key: params.auth_key,
      user_id: params.user_id,
    }),
  );
  return data;
};
