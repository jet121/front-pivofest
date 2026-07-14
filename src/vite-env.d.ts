/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Импорт `import url from './pic.svg'` — вернёт URL строкой (обрабатывает vite/client).
// Импорт `import Icon from './pic.svg?react'` — вернёт React-компонент (типы из vite-plugin-svgr/client).
