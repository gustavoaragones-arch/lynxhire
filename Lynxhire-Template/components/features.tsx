"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
interface FeatureCard {
  percentage: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    percentage: "70-90%",
    description: "Cheaper than offshore VAs",
  },
  {
    percentage: "60%+",
    description: "Minimum candidate match score",
  },
  {
    percentage: "100%",
    description: "Verified employers and candidates",
  },
  {
    percentage: "24/7",
    description: "AI-powered talent matching",
  },
];

export function Features() {
  return (
    <div className="w-full py-20 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Hire with <span className="text-[oklch(0.65_0.25_30)]">NO</span>{" "}
          spam
        </h2>
        <p className="text-muted-foreground mx-4">
        LynxHire's AI matching ensures quality over quantity. Candidates need 60%+ match scores to apply,
        so you only review candidates who actually fit.
        </p>
      </div>

      <div
        style={{ zIndex: 10 }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "relative p-6 rounded-xl border border-gray-200 bg-background/50 backdrop-blur-sm",
              "hover:shadow-xl transition-discrete",
              "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-12",
              "before:bg-linear-to-r/[in_oklch] from-[oklch(0.65_0.25_30)] to-[oklch(0.75_0.15_30)]",
              "inset-shadow-sm"
            )}
          >
            <BackgroundGrid className="absolute rounded-xl inset-0 z-0" />
            <div className="absolute z-0 inset-0 rounded-xl h-full bg-radial/[in_oklch] from-white/50 via-white/60 to-white" />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-2">{feature.percentage}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute rounded-full max-w-3xl mx-auto bottom-0 w-full left-1/2 -translate-x-1/2">
        <CanvasRevealEffect
          colors={[[255, 107, 43]]}
          dotSize={3}
          animationSpeed={1}
        />
        <div className="absolute z-10 inset-0 h-full bg-radial/[in_oklch] from-white/80 via-white/90 to-white" />
      </div>
    </div>
  );
}

const BackgroundGrid = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e5e5 1px, transparent 1px),
          linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        className="absolute w-full h-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  );
};
