"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiAi";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromOpenAI } from "@/lib/openAi";
import { formatFileNameAsTitle } from "@/utils/formatFileName";
import { auth } from "@clerk/nextjs/server";

export async function generatePdfSummary(
  uploadResponse:
    | {
        serverData: {
          userId: string;
          file: {
            ufsUrl: string;
            name: string;
          };
        };
      }[]
    | null
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "PDF URL is missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });
    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("OpenAI Summary:", summary);
    } catch (err: any) {
      console.log("OpenAI Error:", err);
      // Check if it's a rate limit error
      if (
        err instanceof Error &&
        (err.message === "Rate limit exceeded" ||
          err.message?.toLowerCase().includes("rate limit"))
      ) {
        console.log("Switching to Gemini due to rate limit...");
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Gemini Summary:", summary);
        } catch (geminiError) {
          console.error(
            "Gemini Api failed after openAi quota reached",
            geminiError
          );
          throw new Error("Gemini Api failed after openAi quota reached");
        }
      } else {
        throw err; // Re-throw other errors
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    return { success: false, message: "PDF URL is missing", data: null };
  }
}
interface SavePdfSummaryProps {
  userId?: string;
  pdfUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

async function savePdfSummary({
  userId,
  pdfUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryProps) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) VALUES(${userId}, ${pdfUrl}, ${summary}, ${title}, ${fileName})`;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error Saving Summary",
    };
  }
}

export async function storeSummary({
  pdfUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryProps) {
  let savePdfSummaryResponse;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    savePdfSummaryResponse = await savePdfSummary({
      userId,
      pdfUrl,
      summary,
      title,
      fileName,
    });
    if (!savePdfSummaryResponse) {
      return {
        success: false,
        message: "Error Saving Summary,please try again...",
      };
    }
    return {
      success: true,
      message: "Summary saved successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error Saving Summary",
    };
  }
}
