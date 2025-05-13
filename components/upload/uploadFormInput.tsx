"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
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
            className=""
          />
        </div>
        <Button className="self-end sm:self-auto">Upload your PDF</Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
