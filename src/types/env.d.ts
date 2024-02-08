declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        LOG_LEVEL?: string;
      }
    }
  }
}
