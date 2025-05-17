import { Layers2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Layers2 className="w-12 h-12 text-rose-500 animate-bounce" />
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
        </div>
        <div className="text-rose-500 font-medium">Loading...</div>
      </div>
    </div>
  );
}
