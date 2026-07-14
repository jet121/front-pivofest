import { api, API_KEY, defaultOptions, toForm } from "@shared/api";

export interface VerifyQrResponse {
  /** 1 — чек можно отправить без фото, 0 — нужно фото. */
  res: 0 | 1;
}

export interface SendReceiptResponse {
  /** id чека в системе jetcrm */
  id: number;
}

/** Проверяет, нужно ли к QR-коду прикладывать фото чека. */
export const verifyQr = async (params: {
  user_id: number;
  qrdata: string;
}): Promise<VerifyQrResponse> => {
  const { data } = await api.post<VerifyQrResponse>(
    "receipt/verifyqr",
    toForm({
      ...defaultOptions(),
      user_id: params.user_id,
      qrdata: params.qrdata,
    }),
  );
  return data;
};

/** Отправляет чек: QR-строку и/или фото (обязателен хотя бы один). */
export const sendReceipt = async (params: {
  user_id: number;
  auth_key: string;
  qrdata?: string;
  image?: Blob | null;
}): Promise<SendReceiptResponse> => {
  const form = new FormData();
  form.append("api_key", API_KEY);
  form.append("user_id", String(params.user_id));
  form.append("auth_key", params.auth_key);
  if (params.qrdata) form.append("qrdata", params.qrdata);
  if (params.image) form.append("image", params.image, "receipt.jpg");

  const { data } = await api.post<SendReceiptResponse>(
    "receipt/send",
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
};
