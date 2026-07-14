/**
 * Внешние ссылки, которых нет в API service/data.
 * Заполнить реальными URL, когда они появятся.
 */
export const EXTERNAL_LINKS = {
  /** Покупка билета на фестиваль */
  TICKET: "",
  /** Продукция завода, участвующая в акции */
  PRODUCTS: "",
  /** Подробнее о фестивале */
  FESTIVAL: "",
};

/** Открывает ссылку в новой вкладке, если она задана. */
export const openExternal = (url: string) => {
  if (url) window.open(url, "_blank", "noopener");
};
