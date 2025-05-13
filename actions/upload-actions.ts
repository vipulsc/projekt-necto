"use server";

import { fetchAndExtractPdfText } from "@/lib/langChain";

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
    console.log(pdfText);
  } catch (err) {
    return { success: false, message: "PDF URL is missing", data: null };
  }
}
