/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // ✅ add other env vars you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
