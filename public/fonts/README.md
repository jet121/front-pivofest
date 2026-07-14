# Шрифты

Сюда положить файлы шрифтов (лучше `.woff2`). Имена должны совпадать
с прописанными в `src/app/styles/fonts.css` (или поправьте пути под свои файлы).

Ожидаемые файлы:

- `TildaSans-Regular.woff2`
- `TildaSans-Medium.woff2`
- `TildaSans-Bold.woff2`
- `TildaScript-Regular.woff2`
- `Parangon-Regular.woff2`

Пути в CSS начинаются с `/fonts/...` — файлы отдаются напрямую из `public/`.
Пока файла нет, браузер просто использует системный fallback, сборка не ломается.

Использование через переменные:

```css
font-family: var(--font-sans);    /* Tilda Sans */
font-family: var(--font-script);  /* Tilda Script */
font-family: var(--font-paragon); /* Parangon */
```
