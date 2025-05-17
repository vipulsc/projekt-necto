"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "@/components/ui/progress";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = "";
      }
      currentPoint = trimmedLine.substring(1).trim();
    } else if (trimmedLine.startsWith("-")) {
      currentPoint = trimmedLine.substring(1).trim();
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return { title: cleanTitle, content: points };
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSection((prev) => (prev < sections.length - 1 ? prev + 1 : prev));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-0 bg-gradient-to-br from-rose-50/50 to-white">
      <div className="px-8 pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-rose-600">
            Reading Progress
          </span>
          <span className="text-sm font-medium text-rose-600">
            {currentSection + 1} of {sections.length}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-rose-100/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="hover:bg-rose-50 transition-all duration-200 rounded-full h-10 w-10 text-rose-600"
        >
          <ChevronLeft className="h-5 w-5 text-rose-50" />
        </Button>
        <CardTitle className="text-xl font-bold text-center flex-1 px-4 text-rose-900">
          {sections[currentSection].title}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
          className="hover:bg-rose-50 transition-all duration-200 rounded-full h-10 w-10 text-rose-600"
        >
          <ChevronRight className="h-5 w-5 text-rose-50" />
        </Button>
      </CardHeader>
      <CardContent className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              rotateY: { duration: 0.3 },
            }}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {sections[currentSection].content.map((point, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg hover:bg-white transition-all duration-200 border border-rose-100 hover:border-rose-200 hover:scale-[1.02]"
                >
                  <p className="text-base leading-6">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
