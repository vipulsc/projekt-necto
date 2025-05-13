import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const pdfBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([pdfBuffer]));
  const docs = await loader.load();

  //combine pages
  return docs.map((doc) => doc.pageContent).join("\n");
}
