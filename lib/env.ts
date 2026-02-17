import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    AUTH_GITHUB_CLIENT_ID: z.string().min(1),
    AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
    // RESEND_API_KEY: z.string(),
    ARCJET_KEY: z.string().min(1),
    // NODE_ENV: z.enum(["development", "test", "production"]),

    GMAIL_USER: z.string().email(),
    GMAIL_APP_PASS: z.string().min(16),

    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_ENDPOINT_URL_S3: z.string().min(1),
    // AWS_ENDPOINT_URL_IAM: z.string().min(1),
    AWS_REGION: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.string().min(1),
  },

  //   client: {
  //     NEXT_PUBLIC_APP_URL: z.string().url(),
  //   },

  //   runtimeEnv: {
  //     DATABASE_URL: process.env.DATABASE_URL,
  //     NODE_ENV: process.env.NODE_ENV,
  //     NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  //   },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES:
      process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
  },
});
