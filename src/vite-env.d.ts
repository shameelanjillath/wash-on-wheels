
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PG_HOST: string;
  readonly VITE_PG_PORT: string;
  readonly VITE_PG_DATABASE: string;
  readonly VITE_PG_USER: string;
  readonly VITE_PG_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
