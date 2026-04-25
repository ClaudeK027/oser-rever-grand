"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerChild } from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * VISION CARD — Design System
 * ═══════════════════════════════════════════════════
 *
 * Carte de contenu pour la section Vision.
 * Présente un titre coloré + une liste de points.
 * Supporte les animations stagger via Framer Motion.
 *
 * Usage :
 *   <VisionCard
 *     titre="Inspiration et Motivation"
 *     points={["Point 1", "Point 2"]}
 *     accentColor="gold"
 *   />
 */

interface VisionCardProps {
  titre: string;
  points: string[];
  accentColor?: "gold" | "blue" | "green";
  className?: string;
}

const accentColors = {
  gold: {
    title: "text-gold-500",
    dot: "bg-gold-500",
    border: "hover:border-gold-500/30",
  },
  blue: {
    title: "text-blue-500",
    dot: "bg-blue-500",
    border: "hover:border-blue-500/30",
  },
  green: {
    title: "text-emerald-500",
    dot: "bg-emerald-500",
    border: "hover:border-emerald-500/30",
  },
};

export function VisionCard({
  titre,
  points,
  accentColor = "gold",
  className,
}: VisionCardProps) {
  const colors = accentColors[accentColor];

  return (
    <motion.div
      variants={staggerChild}
      className={cn(
        "elevated-card p-6 space-y-4",
        colors.border,
        className
      )}
    >
      <h3
        className={cn(
          "text-heading-sm font-serif uppercase tracking-wide",
          colors.title
        )}
      >
        {titre}
      </h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span
              className={cn(
                "mt-2 w-1.5 h-1.5 rounded-full shrink-0",
                colors.dot
              )}
            />
            <span className="text-body-sm font-sans text-muted-foreground">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
