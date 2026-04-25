"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  label?: string;
  className?: string;
  targetId?: string;
}

export function ScrollIndicator({
  label = "Scroll",
  className,
  targetId,
}: ScrollIndicatorProps) {
  const handleClick = () => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={`Faire défiler vers ${targetId ?? "la section suivante"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex flex-col items-center gap-3 cursor-pointer select-none",
        "focus-visible:outline-none",
        className
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70 group-hover:text-accent transition-colors duration-medium">
        {label}
      </span>
      <div className="relative h-12 w-[1px] overflow-hidden bg-white/10 rounded-pill">
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.button>
  );
}
