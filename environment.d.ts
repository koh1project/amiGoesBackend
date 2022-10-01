declare global {
  namespace NodeJS {
    // Declare all the environment variables here.
    interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
    }
  }
}

export {};

