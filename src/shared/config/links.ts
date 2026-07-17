/**
 * Внешние ссылки, которых нет в API service/data.
 * Заполнить реальными URL, когда они появятся.
 */
export const EXTERNAL_LINKS = {
  /** Покупка билета на фестиваль */
  TICKET:
    "https://orenburg.kassir.ru/festivali/polyana-kraft/kraft-bazar-festival-gastronomii-i-muzyiki_2026-09-05",
  /** Продукция завода, участвующая в акции */
  PRODUCTS: "https://orenbeer.ru/store/pivo",
  /** Подробнее о фестивале */
  FESTIVAL: "https://craft-bazar.ru/",
};

/** Открывает ссылку в новой вкладке, если она задана. */
export const openExternal = (url: string) => {
  if (url) window.open(url, "_blank", "noopener");
};
