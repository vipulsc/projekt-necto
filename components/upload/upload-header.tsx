import React from "react";
import BgGradient from "../styling-component/bgGradient";
import { Badge } from "../ui/badge";
import { WandSparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-400 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-rose-200 rounded-full group-hover:bg-rose-100 transition-colors duration-300"
        >
          <WandSparkles className="text-rose-700 mr-2 animate-pulse" />
          <p className="text-base text-rose-700 ">AI in Action</p>
        </Badge>
      </div>
      <div className="capitalize tracking-tighter">
        <h1 className="font-bold text-center">Drop Your PDFs Here</h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
          Our smart AI will take it from there ✨
        </p>
      </div>
    </div>
  );
};

export default UploadHeader;
