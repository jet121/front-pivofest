# Bazar

React + TypeScript + Vite. Архитектура — Feature-Sliced Design (FSD).
Роутинг — React Router, состояние — Redux Toolkit, стили — CSS Modules.

## Запуск

```bash
npm install
npm run dev      # дев-сервер (по умолчанию http://localhost:5173)
npm run build    # прод-сборка (tsc + vite build)
npm run preview  # предпросмотр прод-сборки
npm run lint     # проверка типов (tsc --noEmit)
```

## Структура (FSD)

```
src/
  app/          # инициализация: провайдеры (store, router), глобальные стили
  pages/        # страницы
  widgets/      # композиционные блоки (PageLayout с навигацией)
  features/     # фичи (age-verification — плашка «18+»)
  entities/     # бизнес-сущности (пока пусто)
  shared/       # переиспользуемое: ui, config, lib, assets
```

Импорт слоёв — только «сверху вниз» через публичные API (`index.ts`).

## Алиасы

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`
(прописаны в `vite.config.ts` и `tsconfig.app.json`).

## Проверка возраста (18+)

Плашка «Вам исполнилось 18 лет?» показывается поверх приложения при первом
заходе (`src/features/age-verification`). Ответ сохраняется в `localStorage`:

- **Да** → доступ открыт;
- **Нет** → экран с ограничением доступа и кнопкой «Ответить заново».

## Цвета

Заданы CSS-переменными в `src/app/styles/variables.css`:
`--color-white/orange/green/red/background/surface/dark`.

## Шрифты

`Tilda Sans`, `Tilda Script`, `Parangon` — переменные `--font-sans/script/paragon`.
Файлы (`.woff2`) положить в `public/fonts/` — см. `public/fonts/README.md`.

## SVG

- как URL: `import url from './pic.svg'`
- как React-компонент: `import Icon from './pic.svg?react'`

(настроено через `vite-plugin-svgr`, типы — в `src/vite-env.d.ts`)
