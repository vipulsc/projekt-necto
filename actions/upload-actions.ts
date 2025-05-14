"use server";

import { generateSummaryFromGemini } from "@/lib/geminiAi";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromOpenAI } from "@/lib/openAi";

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

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary },
    };
  } catch (err) {
    return { success: false, message: "PDF URL is missing", data: null };
  }
}
