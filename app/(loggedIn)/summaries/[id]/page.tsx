import BgGradient from "@/components/styling-component/bgGradient";
import SummaryHeader from "@/components/summary/summaryHeader";
import SourceInfo from "@/components/summary/source-info";
import SummaryViewer from "@/components/summary/summaryViewer";
import { getSummaryById } from "@/lib/summary";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

const LoadingSummaryViewer = () => (
  <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
    <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-orange-50 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
      <div className="h-3 w-3 sm:h-4 sm:w-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="relative mt-8 sm:mt-6 flex justify-center">
      <div className="w-full space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LoadingSummaryHeader = () => (
  <div className="space-y-4">
    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
  </div>
);

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const summary = await getSummaryById(id);
  if (!summary) {
    notFound();
  }

  const {
    title,
    summary_text,
    created_at,
    file_name,
    word_count,
    original_file_url,
  } = summary;
  const reading_time_minutes = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose50/50 to-white">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex flex-col">
            <Suspense fallback={<LoadingSummaryHeader />}>
              <SummaryHeader
                title={title}
                created_at={created_at}
                reading_time={reading_time_minutes}
              />
            </Suspense>
            {file_name && (
              <SourceInfo
                file_name={file_name}
                original_file_url={original_file_url}
                title={title}
                summary_text={summary_text}
                created_at={created_at}
              />
            )}
          </div>

          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <Suspense fallback={<LoadingSummaryViewer />}>
              <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-orange-50 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {word_count?.toLocaleString()} words
                </div>
                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary_text} />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
