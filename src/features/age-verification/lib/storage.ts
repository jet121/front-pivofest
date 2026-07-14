import type { AgeStatus } from '../model/types';

const STORAGE_KEY = 'age-verification-status';

export const readAgeStatus = (): AgeStatus => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'confirmed' || value === 'declined') {
      return value;
    }
  } catch {
    // localStorage может быть недоступен (SSR / приватный режим) — игнорируем
  }
  return 'pending';
};

export const writeAgeStatus = (status: AgeStatus): void => {
  try {
    if (status === 'pending') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, status);
    }
  } catch {
    // игнорируем ошибки записи
  }
};
