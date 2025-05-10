import DemoSection from "@/components/home/demoSection";
import HeroSection from "@/components/home/heroSection";
import Working from "@/components/home/working";
import BgGradient from "@/components/styling-component/bgGradient";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <Working />
      </div>

      {/* <PricingSection /> */}
      {/* <CTASection /> */}
    </div>
  );
}
