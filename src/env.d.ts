/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APPENV: "dev" | "qa" | "uat" | "prd";
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMeta;
}
