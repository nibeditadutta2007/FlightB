import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_URL, NODE_ENV } from "./envConfig.js";
import * as schema from "../db/schema.js";

const pool = new Pool({ connectionString: DATABASE_URL });

pool.on("error", (err) => {
  console.error("[dbConfig] Unexpected error on idle Postgres client", err);
  process.exit(1);
});

export const db = drizzle({ client: pool, schema, logger: NODE_ENV === "development" });
export { pool };