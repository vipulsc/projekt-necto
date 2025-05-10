import CTASection from "@/components/home/ctaSection";
import DemoSection from "@/components/home/demoSection";
import HeroSection from "@/components/home/heroSection";
import PricingSection from "@/components/home/pricingSection";
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
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
