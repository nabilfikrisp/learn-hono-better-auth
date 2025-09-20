import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

const envSchema = {
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url().default("http://localhost:3001"),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
};

const parsedEnv = z.object(envSchema).safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.issues);
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  IS_DEV: parsedEnv.data.NODE_ENV === "development",
  IS_PROD: parsedEnv.data.NODE_ENV === "production",
  IS_TEST: parsedEnv.data.NODE_ENV === "test",
};
