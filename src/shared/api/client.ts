import axios from "axios";
import { API_URL } from "./config";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

/**
 * Обработчик протухшей сессии. Регистрируется приложением (App),
 * чтобы client не зависел от redux-стора напрямую.
 */
let authErrorHandler: (() => void) | null = null;

export const setAuthErrorHandler = (handler: (() => void) | null) => {
  authErrorHandler = handler;
};

/** Признак того, что сессия недействительна / протухла. */
const AUTH_ERROR_RE = /authoriz|unauthorized|auth_key|не\s*авториз/i;

const extractApiError = (payload: unknown): string | undefined => {
  if (payload && typeof payload === "object" && "error" in payload) {
    const value = (payload as { error?: unknown }).error;
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
};

api.interceptors.response.use(
  (response) => {
    // Некоторые методы отвечают 200 с телом { result: 0, error: "..." }.
    const message = extractApiError(response.data);
    if (message && AUTH_ERROR_RE.test(message)) {
      authErrorHandler?.();
    }
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const message = extractApiError(error.response?.data);
      if (message && AUTH_ERROR_RE.test(message)) {
        authErrorHandler?.();
      }
    }
    return Promise.reject(error);
  },
);

/** Приводит ошибку axios к человекочитаемому сообщению от бэкенда. */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined;
    if (data?.error) return data.error;
    return error.message;
  }
  return "Что-то пошло не так. Попробуйте позже.";
};
