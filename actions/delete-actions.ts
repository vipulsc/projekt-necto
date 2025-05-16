"use server";

import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryId: string) {
  try {
    const sql = await getDbConnection();
    await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId}`;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false, error: "Failed to delete summary" };
  }
}
