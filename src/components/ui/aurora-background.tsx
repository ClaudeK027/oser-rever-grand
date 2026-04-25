"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  showGrain?: boolean;
}

export function AuroraBackground({
  className,
  intensity = "medium",
  showGrain = true,
}: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: 0.4,
    medium: 0.7,
    strong: 1,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{ opacity: opacityMap[intensity] }}
    >
      <div className="absolute inset-0 bg-gradient-aurora" />

      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/20"
        style={{ filter: "blur(var(--blur-aurora))" }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent/15"
        style={{ filter: "blur(var(--blur-aurora))" }}
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/10"
        style={{ filter: "blur(var(--blur-aurora))" }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {showGrain && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.06,
          }}
        />
      )}
    </div>
  );
}
