import HeroSection from "@/components/home/heroSection";
import BgGradient from "@/components/styling-component/bgGradient";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient>
        <div className="flex flex-col">
          <HeroSection />
        </div>
      </BgGradient>
      {/* <DemoSection /> */}
      {/* <HowItWorksSection /> */}
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
    </div>
  );
}
