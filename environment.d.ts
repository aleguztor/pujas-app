export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GITHUB_REDIRECT_URI: string;
      COOKIE_SESSION_SECRET_ID: string;
      // Añade aquí otras variables de entorno según sea necesario
    }
  }
}
