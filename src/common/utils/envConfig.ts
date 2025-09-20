import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

const envSchema = {
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.url(),
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
