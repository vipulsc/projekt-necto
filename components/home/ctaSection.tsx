import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-rose-50/60 py-12 ">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div>
            <h2 className="text-3xl  font-bold text-rose-700 max-w-5xl mx-auto tracking-tighter sm:text-4xl md:text-5xl ">
              Ready to Extract What Matters Without Reading Every Page?
            </h2>
            <p className="mx-auto max-w-2xl text-rose-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-rose-300">
              Beyond Summarization: We Convert Document Complexity into
              Strategic Intelligence You Can Act On
            </p>
          </div>
          <div className="flex flex-col items-center justify-center  min-[400px]:flex-row gap-2">
            <div className="">
              <Button
                variant={"link"}
                className="text-white text-base sm:text-lg lg:text-xl 
		rounded-full px-6 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8
		bg-gradient-to-l from-rose-900 via-rose-500 to-rose-400
		hover:bg-gradient-to-r hover:from-rose-900 hover:via-rose-500 hover:to-rose-400
		shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 transition-all duration-300
		no-underline hover:no-underline"
              >
                <Link href="/#pricing" className="flex gap-2 items-center">
                  <span>Get Started</span>
                  <ArrowRight className="animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
