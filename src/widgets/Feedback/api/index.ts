import { api, API_ROUTES, API_KEY, defaultOptions, toForm } from "@shared/api";

export interface RequestType {
  id: number;
  title: string;
  active: 0 | 1;
  manager: 0 | 1;
}

export interface SendRequestParams {
  email: string;
  request: string;
  type_id: number;
  auth_key?: string;
  user_id?: number;
  file?: File | null;
}

export const getRequestTypes = async (): Promise<RequestType[]> => {
  const { data } = await api.post<RequestType[]>(
    API_ROUTES.CONTACT_TYPES,
    toForm({ ...defaultOptions() }),
  );
  return data.filter((type) => type.active === 1);
};

export const sendRequest = async (params: SendRequestParams) => {
  const { file, ...fields } = params;

  if (file) {
    const form = new FormData();
    form.append("api_key", API_KEY);
    form.append("email", fields.email);
    form.append("request", fields.request);
    form.append("type_id", String(fields.type_id));
    if (fields.auth_key) form.append("auth_key", fields.auth_key);
    if (fields.user_id != null) form.append("user_id", String(fields.user_id));
    form.append("image", file);

    const { data } = await api.post(API_ROUTES.CONTACT, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }

  const { data } = await api.post(
    API_ROUTES.CONTACT,
    toForm({ ...defaultOptions(), ...fields }),
  );
  return data;
};
