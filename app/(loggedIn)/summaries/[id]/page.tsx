import BgGradient from "@/components/styling-component/bgGradient";
import { getSummary } from "@/lib/summary";
import { notFound } from "next/navigation";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const summary = await getSummary({ id });
  if (!summary) {
    notFound();
  }

  const { title, summary_text, created_at, file_name } = summary;
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose50/50 to-white">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 sm:px-6 lg:px-8 py-12 sm:py-18">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{title}</h1>
              {file_name && (
                <p className="text-sm text-muted-foreground">{file_name}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
