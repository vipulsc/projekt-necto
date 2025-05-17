import BgGradient from "@/components/styling-component/bgGradient";
import EmptySummary from "@/components/summary/empty-summary";
import SummmaryCard from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries, Summary } from "@/lib/summary";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const LoadingSummaryCard = () => (
  <SummmaryCard
    summary={{
      id: "loading",
      orignal_file_url: "",
      title: "",
      created_at: new Date().toISOString(),
      summary_text: "",
      status: "loading",
    }}
    isLoading={true}
  />
);

const LoadingSummaryGrid = () => (
  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
    {Array.from({ length: 3 }).map((_, i) => (
      <LoadingSummaryCard key={i} />
    ))}
  </div>
);

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  const summaries = await getSummaries(userId);
  const uploadLimit = 5;

  return (
    <main className="min-h-screen">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-18">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-rose-500 to-rose-600 text-transparent bg-clip-text">
                Your Summaries
              </h1>
              <p className="text-gray-900 tracking-tighter">
                Transform your PDFs into actionable insights with Necto.
              </p>
            </div>
            <Button
              variant={"link"}
              className="no-underline hover:no-underline bg-linear-to-r from-rose-500 to-rose-600
             hover:from-rose-600 hover:to-rose-700 hover:shadow hover:shadow-rose-700/50
              hover:scale-105 transition-all duration-300"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          {summaries.length >= uploadLimit && (
            <div className="mb-6">
              <div className="bg-rose-500/10 rounded-lg p-4 border border-rose-500/20">
                <p className="text-sm">
                  You have reached your limit of {uploadLimit} summaries{" "}
                  <Link
                    href="/#pricing"
                    className="text-rose-800 hover:text-rose-900 underline font-medium underline-offset-4 inline-flex items-center gap-1"
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowRight className="w-4 h-4 inline-block" />
                  </Link>{" "}
                  to enable unlimited summaries.
                </p>
              </div>
            </div>
          )}
          <Suspense fallback={<LoadingSummaryGrid />}>
            {summaries.length === 0 ? (
              <EmptySummary />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                {summaries.map((summary: Summary) => (
                  <SummmaryCard key={summary.id} summary={summary} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
