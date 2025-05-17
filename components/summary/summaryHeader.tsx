import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
export default function SummaryHeader({
  title,
  created_at,
  reading_time,
}: {
  title: string;
  created_at: string;
  reading_time: number;
}) {
  return (
    <div className="flex  gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-6">
          <Badge
            variant={"secondary"}
            className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all duration-300 hover:text-rose-500 hover:cursor-pointer hover:shadow-sm hover:shadow-rose-500/20 hover:border-rose-500/20 hover:border-2 hover:border-solid animate-pulse hover:animate-none"
          >
            <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 text-rose-500 group-hover:text-rose-500 transition-all duration-300 animate-pulse hover:animate-none group-hover:scale-110 group-hover:rotate-12" />
            Premium
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 text-rose-500 group-hover:text-rose-500" />
            <span className="text-sm text-muted-foreground">
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 text-rose-500 group-hover:text-rose-500" />
            <span className="text-sm text-muted-foreground">
              {`${reading_time} min read`}
            </span>
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl lg:tracking-tight font-bold">
          <span className="bg-linear-to-r from-rose-500 via-rose-600 to-rose-900 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Link href="/dashboard">
          <Button
            variant={"link"}
            className="group flex items-center gap-2 px-4 py-2 no-underline hover:no-underline text-rose-50 hover:text-rose-100 transition-all duration-300"
            size={"lg"}
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function SourceInfo({
  file_name,
  original_file_url,
  title,
  summary_text,
  created_at,
}: {
  file_name: string;
  original_file_url: string;
  title: string;
  summary_text: string;
  created_at: string;
}) {
  return <div>{file_name}</div>;
}
