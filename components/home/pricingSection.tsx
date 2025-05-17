"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon, PartyPopperIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

type priceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
  id: string;
};

const plans: priceType[] = [
  {
    id: "basic",
    name: "Basic",
    price: 4.99,
    description: "For personal use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Friendly email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 14.99,
    description: "For business use",
    items: [
      "Unlimited PDF summaries",
      "Lightning-fast priority processing",
      "Premium 24/7 dedicated support",
      "Seamless Markdown export",
    ],
    paymentLink: "",
    priceId: "",
  },
];
const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: priceType) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCelebration(true);
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  return (
    <>
      <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
        <div
          className={cn(
            "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-base-content/20",
            id === "pro" && "border-rose-500 gap-5 border-2 bg-rose-100"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
              <p className="text-base-content/80 mt-2">{description}</p>
            </div>
          </div>
          <div className="flex gap-2 ">
            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
            <div className="flex flex-col justify-end mb-[4px]">
              <p className="text-xs uppercase font-semibold">USD</p>
              <p className="text-xs">/month</p>
            </div>
          </div>
          <div className="space-y-2.5 leading-relaxed text-base flex-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckIcon size={18}></CheckIcon>
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="space-y-2 flex justify-center w-full">
            <button
              onClick={handleClick}
              className={cn(
                "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-800 hover:from-rose-800 hover:to-rose-500  text-white border-2 py-2.5 ",
                id === "pro" &&
                  "bg-gradient-to-r hover:from-rose-500 hover:to-rose-800 from-rose-800 to-rose-500"
              )}
            >
              Buy now <ArrowRightIcon size={18}></ArrowRightIcon>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-rose-500 flex items-center justify-center gap-2">
              <PartyPopperIcon className="w-8 h-8" />
              It's Free!
            </DialogTitle>
            <DialogDescription className="text-center text-lg mt-4">
              Everything is free for now! Enjoy using our service without any
              charges. 🎉
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {showCelebration && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}
    </>
  );
};

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden pb-24" id="pricing">
      <div className="py-8 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-7"></div>
      <div className="flex justify-center items-center w-full pb-12">
        <h2 className="text-xl uppercase font-bold mb-8 text-rose-500">
          Pricing
        </h2>
      </div>
      <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8 px-4 sm:px-6 lg:px-12">
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
