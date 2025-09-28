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
};

const parsedEnv = z.object(envSchema).safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.issues);
  throw new Error("Invalid environment variables");
}

export const ENV = {
  ...parsedEnv.data,
  IS_DEV: parsedEnv.data.NODE_ENV === "development",
  IS_PROD: parsedEnv.data.NODE_ENV === "production",
  IS_TEST: parsedEnv.data.NODE_ENV === "test",
};
