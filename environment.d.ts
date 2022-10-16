declare global {
  namespace NodeJS {
    // Declare all the environment variables here.
    interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_BUCKET: string;
      MODE: 'Development' | 'Production';
    }
  }
}
export {};

