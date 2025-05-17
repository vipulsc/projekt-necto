import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import DeleteButton from "./delete-button";
import { Badge, File, FileTextIcon } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { Loader } from "../ui/loader";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
  isLoading,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="p-2.5 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-all duration-300">
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          <FileTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {isLoading ? (
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
        ) : (
          <h3 className="text-base xl:text-lg font-semibold truncate tracking-tight text-gray-900 group-hover:text-rose-600 transition-all duration-300">
            {title || formatFileName(fileUrl)}
          </h3>
        )}
        {isLoading ? (
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            {(() => {
              const date = new Date(createdAt);
              const now = new Date();
              const diffInMs = now.getTime() - date.getTime();
              const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
              const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
              const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

              if (diffInMinutes < 1) {
                return "Just now";
              } else if (diffInMinutes < 60) {
                return `${diffInMinutes} minute${
                  diffInMinutes === 1 ? "" : "s"
                } ago`;
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
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({
  status,
  isLoading,
}: {
  status: string;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />;
  }

  return (
    <span
      className={cn(
        "px-3 py-1 text-sm font-medium rounded-full capitalize transition-all duration-300 transform group-hover:scale-105",
        status === "completed"
          ? "bg-rose-50 text-rose-700 border border-rose-200 group-hover:bg-rose-100"
          : status === "failed"
          ? "bg-red-50 text-red-700 border border-red-200 group-hover:bg-red-100"
          : "bg-yellow-50 text-yellow-700 border border-yellow-200 group-hover:bg-yellow-100"
      )}
    >
      {status}
    </span>
  );
};

export default function SummmaryCard({
  summary,
  isLoading,
}: {
  summary: any;
  isLoading?: boolean;
}) {
  return (
    <div className="group">
      <Card className="relative h-full border border-gray-200 hover:border-rose-200 transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1">
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-5">
            <SummaryHeader
              fileUrl={summary.orignal_file_url}
              title={summary.title}
              createdAt={summary.created_at}
              isLoading={isLoading}
            />

            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            ) : (
              <p className="text-sm text-gray-600 line-clamp-2 sm:text-base pl-2 group-hover:text-gray-900 transition-all duration-300">
                {summary.summary_text}
              </p>
            )}
            <div className="flex justify-between mt-2 items-center sm:mt-4">
              <StatusBadge status={summary.status} isLoading={isLoading} />
            </div>
          </div>
        </Link>
        {!isLoading && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
            <DeleteButton summaryId={summary.id} />
          </div>
        )}
      </Card>
    </div>
  );
}
