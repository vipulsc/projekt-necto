"use client";

import { forwardRef, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader } from "../ui/loader";
import { Upload, FileText, X } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        const input = document.getElementById("file") as HTMLInputElement;
        if (input) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;
        }
      }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
      const input = document.getElementById("file") as HTMLInputElement;
      if (input) {
        input.value = "";
      }
    };

    return (
      <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl transition-all duration-200",
            isDragging
              ? "border-rose-400 bg-rose-50/50"
              : "border-gray-200 hover:border-rose-200 hover:bg-rose-50/30",
            selectedFile && "border-rose-200 bg-rose-50/30"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-rose-100 w-full max-w-md">
                <FileText className="w-8 h-8 text-rose-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 bg-rose-50 rounded-full">
                <Upload className="w-6 h-6 text-rose-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-xs text-gray-500">Maximum file size: 20MB</p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => document.getElementById("file")?.click()}
                disabled={isLoading}
              >
                Select File
              </Button>
            </div>
          )}
        </div>

        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={isLoading || !selectedFile}
          className={cn(
            "w-full sm:w-auto sm:self-end transition-all duration-200",
            isLoading && "bg-rose-400",
            !selectedFile && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader size="sm" />
              <span>Processing...</span>
            </div>
          ) : (
            "Upload and Process"
          )}
        </Button>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
