/**
 * Маска для российских номеров: +7 906 254-56-98
 * Принимает произвольный ввод, оставляет только цифры и форматирует.
 * Пустой ввод возвращает пустую строку — чтобы показывался placeholder.
 */
export const formatPhone = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");

  // Отбрасываем ведущую 8 или 7 (код страны вводим сами).
  if (digits.startsWith("8")) digits = digits.slice(1);
  if (digits.startsWith("7")) digits = digits.slice(1);

  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";

  let result = "+7";
  if (digits.length > 0) result += ` ${digits.slice(0, 3)}`;
  if (digits.length >= 4) result += ` ${digits.slice(3, 6)}`;
  if (digits.length >= 7) result += `-${digits.slice(6, 8)}`;
  if (digits.length >= 9) result += `-${digits.slice(8, 10)}`;

  return result;
};

/** Полный ли номер (10 цифр после кода страны). */
export const isPhoneComplete = (value: string): boolean =>
  value.replace(/\D/g, "").replace(/^[78]/, "").length === 10;

/** Форматированный номер → msisdn для API: 10 цифр без кода страны (XXXXXXXXXX). */
export const toMsisdn = (value: string): string =>
  value.replace(/\D/g, "").replace(/^[78]/, "").slice(-10);
