export const API_URL = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_ROUTES = {
  REGISTRATION: "user/registration",
  LOGIN: "user/login",

  TRANSACTIONS: "transaction/list",
  TRANSACTION_BONUSES: "transaction/bonus/list",

  CONTACT: "request/send",
  CONTACT_TYPES: "request/type/list",

  // Пути, которых пока нет на бэкенде (уточняются):
  // SERVICE: "service/data",       // тексты правил/политики/about
  // RECEIPT_CHECK / RECEIPT_SEND   // проверка и отправка чека
} as const;

/**
 * Поля, которые уходят с каждым запросом.
 * api_key обязателен для всех методов; при необходимости сюда можно
 * добавить mall_id/event_id и т.п.
 */
export const defaultOptions = () => ({
  api_key: API_KEY,
});

/** Плоский объект → application/x-www-form-urlencoded. */
export const toForm = (
  data: Record<string, string | number | boolean | undefined | null>,
): string => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString();
};
