import { FileText } from "lucide-react";

export default function EmptySummary() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
      <div className="w-24 h-24 text-gray-300">
        <FileText className="w-full h-full" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">No Summaries Yet</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        Your summaries will appear here once you start creating them.
      </p>
    </div>
  );
}
