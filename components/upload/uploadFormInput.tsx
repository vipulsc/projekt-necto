"use client";

import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader } from "../ui/loader";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 flex-1">
            <p className="text-sm text-gray-500">
              Upload your PDF file to get started
            </p>
            <Input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              required
              className={cn(
                "transition-opacity duration-200",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            />
          </div>
          <Button
            disabled={isLoading}
            className={cn(
              "self-end sm:self-auto transition-all duration-200",
              isLoading && "bg-primary/80"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader size="sm" />
                <span>Processing...</span>
              </div>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
