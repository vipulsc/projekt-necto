import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const getSummaries =
    await sql`SELECT * from pdf_summaries where user_id =${userId} ORDER BY created_at DESC`;

  return getSummaries;
}
