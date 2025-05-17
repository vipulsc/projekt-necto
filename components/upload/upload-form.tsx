"use client";

import { useUploadThing } from "@/utils/uploadThing";
import UploadFormInput from "./uploadFormInput";
import UploadHeader from "./upload-header";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary, storeSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Zap } from "lucide-react";

const schema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "No file selected or invalid file type.",
    })
    .refine((file) => file.size <= 1024 * 1024 * 20, {
      message: "File size must be less than 20MB.",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    }),
});

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload complete");

      // Show "Processing file..." toast after upload
      toast("Processing file...", {
        description: "Hang tight, we're analyzing your file...",
        duration: 5000,
      });

      // TODO: Start processing the file (parse, summarize, etc.)
    },
    onUploadError: (error: Error) => {
      console.log("Upload error", error);
      toast("Upload failed", {
        description: error.message,
        duration: 5000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
    onUploadBegin: (fileName: string) => {
      console.log("upload has begun for", fileName);
      toast("Uploading file...", {
        description: "Hang tight, this may take a while...",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      if (!file) {
        toast("No file selected", {
          description: "Please upload a file before submitting.",
          duration: 5000,
        });
        formRef.current?.reset();
        setIsLoading(false);
        return;
      }

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        const errorMsg =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file";
        toast("Invalid file", {
          description: errorMsg,
          duration: 5000,
        });
        formRef.current?.reset();
        setIsLoading(false);
        return;
      }

      const res = await startUpload([file]);
      if (!res) {
        toast("Something went wrong", {
          description: "Please try again",
          duration: 5000,
        });
        formRef.current?.reset();
        setIsLoading(false);
        return;
      }

      try {
        // - Parse
        const result = await generatePdfSummary(res);

        const { data = null, message = null } = result || {};
        if (data) {
          let storeResult;
          toast("Summary generated successfully", {
            description: "Saving PDF summary...",
            duration: 5000,
          });

          if (data.summary) {
            storeResult = await storeSummary({
              pdfUrl: res[0].serverData.file.ufsUrl,
              summary: data.summary,
              title: data.title,
              fileName: file.name,
            });
            if (storeResult) {
              toast("Summary saved 💫", {
                description: "Summary saved successfully",
                duration: 5000,
              });
              formRef.current?.reset();
              //TODO: Redirect to the summary page
              router.push(`/summaries/${storeResult.id}`);
            }
          } else {
            toast("Error generating summary", {
              description: message || "Something went wrong",
              duration: 5000,
            });
            formRef.current?.reset();
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.log("Error", err);
        toast("Error processing file", {
          description:
            err instanceof Error ? err.message : "Something went wrong",
          duration: 5000,
        });
        formRef.current?.reset();
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error", err);
      toast("Error uploading file", {
        description:
          err instanceof Error ? err.message : "Something went wrong",
        duration: 5000,
      });
      formRef.current?.reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      <UploadHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UploadFormInput
            isLoading={isLoading}
            ref={formRef}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-rose-50 rounded-xl border border-rose-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-500" />
              Quick Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>Maximum file size: 20MB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>Only PDF files are supported</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>Processing time varies based on file size</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-500" />
              What to Expect
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>AI-powered summary generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>Instant access to your summary</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
