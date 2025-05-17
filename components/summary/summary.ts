// import { getDbConnection } from "@/lib/db";

// export async function Summary({ id }: { id: string }) {
//   const sql = await getDbConnection();
//   const summary = await sql`SELECT * FROM pdf_summaries WHERE id = ${id}`;
//   return summary[0];
// }

import { getDbConnection } from "@/lib/db";
