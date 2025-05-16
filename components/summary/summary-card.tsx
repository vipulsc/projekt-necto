import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import DeleteButton from "./delete-button";
import { Badge, File, FileTextIcon } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <FileTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
      <div className="flex-1  min-w-0">
        <h3 className="text-base xl:text-lg font-semibold   truncate tracking-tight text-gray-900">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {(() => {
            const date = new Date(createdAt);
            const now = new Date();
            const diffInMs = now.getTime() - date.getTime();
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInHours < 1) {
              return "Just now";
            } else if (diffInHours < 24) {
              return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
            } else if (diffInDays < 30) {
              return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
            } else {
              return date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
            }
          })()}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-sm font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-500/10 text-green-500, text-green-800"
          : status === "failed"
          ? "bg-red-500/10 text-red-500, text-red-800"
          : "bg-yellow-500/10 text-yellow-500, text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummmaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <Link href={`summaries/${summary.id}`} className="lock p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.orignal_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />

            <p className="text-sm text-gray-600 line-clamp-2 sm:text-base pl-2">
              {summary.summary_text}
            </p>
            <div className="flex justify-between mt-2 items-center sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
      </Card>
    </div>
  );
}
