import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-white border-t border-rose-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-rose-50 to-white rounded-3xl p-8 md:p-12 shadow-xl shadow-rose-100/50 border border-rose-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Start Transforming Your Documents Today
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right content - CTA */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500 mb-2">
                  Ready to get started?
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  $29<span className="text-lg text-gray-500">/month</span>
                </p>
              </div>
              <Button
                variant={"link"}
                className="group text-white text-base rounded-xl px-8 py-4
                  bg-gradient-to-r from-rose-600 to-rose-500
                  hover:from-rose-700 hover:to-rose-600
                  shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 
                  transition-all duration-300
                  no-underline hover:no-underline w-full md:w-auto"
              >
                <Link href="/#pricing" className="flex items-center gap-2">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="text-xs text-gray-500 text-center md:text-right">
                Join 1000+ professionals already using Necto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
