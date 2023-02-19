import * as dotenv from "dotenv";
import postgres from "postgres"

dotenv.config();
export const sql = postgres(process.env.postgreSQLdb, {idle_timeout: 0, connect_timeout: 1, max: 5});
