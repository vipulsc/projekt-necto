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

export async function getSummary({ id }: { id: string }) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`SELECT * FROM pdf_summaries WHERE id = ${id}`;
    return summary;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] =
      await sql`SELECT id, user_id, title, original_file_url, summary_text, status, created_at, updated_at, file_name, LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count FROM pdf_summaries WHERE id = ${id}`;
    return summary;
  } catch (error) {
    console.error("Error fetching summary by id:", error);
    return null;
  }
}
