import { Pool } from "pg";
import { env } from "@/common/utils/env.config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, {
  schema: schema,
  casing: "snake_case",
});
