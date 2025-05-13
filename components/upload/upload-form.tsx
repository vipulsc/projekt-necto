"use client";

import { useUploadThing } from "@/utils/uploadThing";
import UploadFormInput from "./uploadFormInput";
import { z } from "zod";
import { toast } from "sonner";

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
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
      toast("Uploading file...", {
        description: "Hang tight, this may take a while...",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file) {
      toast("No file selected", {
        description: "Please upload a file before submitting.",
        duration: 5000,
      });
      return;
    }

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      const errorMsg =
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file";
      toast("Invalid file", {
        description: errorMsg,
        duration: 5000,
      });
      return;
    }

    const res = await startUpload([file]);
    if (!res) {
      toast("Something went wrong", {
        description: "Please try again",
        duration: 5000,
      });
      return;
    }

    // TODO:
    // - Parse
    // - Summarize
    // - Save
    // - Redirect to [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
