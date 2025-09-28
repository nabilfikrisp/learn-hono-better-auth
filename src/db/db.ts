import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import { ENV } from "../common/utils/envConfig.js";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  schema: schema,
  casing: "snake_case",
});
