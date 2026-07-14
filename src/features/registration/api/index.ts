import { api, API_ROUTES, defaultOptions, toForm } from "@shared/api";

export interface RegistrationResponse {
  result: 1;
  registered: boolean;
}

export interface LoginResponse {
  auth_key: string;
  user_id: number;
  fullname: string;
  email: string;
}

/** Запрашивает SMS-код. confirm=1 — отправить код на номер. */
export const registrationRequest = async (params: {
  msisdn: string;
  fullname?: string;
}): Promise<RegistrationResponse> => {
  const { data } = await api.post<RegistrationResponse>(
    API_ROUTES.REGISTRATION,
    toForm({ ...defaultOptions(), msisdn: params.msisdn, confirm: 1, fullname: params.fullname }),
  );
  return data;
};

/** Логин по номеру и коду из SMS (password = код). */
export const login = async (params: {
  msisdn: string;
  password: string;
  promocode?: string;
}): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    API_ROUTES.LOGIN,
    toForm({ ...defaultOptions(), ...params }),
  );
  return data;
};
