import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER || "postgres",
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  max: 10,
});

type VariableType = string | number | Date | boolean;

export async function query(query: string, variables = <VariableType[] | undefined>[]) {
  const client = await pool.connect();
  try {
    return await client.query(query, variables);
  } catch (error) {
    console.log(error);
  } finally {
    client.release(true);
  }
}
