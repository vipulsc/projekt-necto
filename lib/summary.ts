import { getDbConnection } from "./db";

export interface Summary {
  id: string;
  user_id: string;
  orignal_file_url: string;
  title: string | null;
  created_at: string;
  summary_text: string;
  status: string;
}

export async function getSummaries(userId: string): Promise<Summary[]> {
  const sql = await getDbConnection();
  const getSummaries =
    await sql`SELECT * from pdf_summaries where user_id =${userId} ORDER BY created_at DESC`;

  return getSummaries as Summary[];
}
