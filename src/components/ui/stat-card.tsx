"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerChild } from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * STAT CARD — Design System
 * ═══════════════════════════════════════════════════
 *
 * Carte de statistique avec nombre animé et description.
 * Le chiffre est affiché en grand format avec dégradé doré.
 *
 * Usage :
 *   <StatCard valeur="21" label="ans" description="..." />
 */

interface StatCardProps {
  valeur: string;
  label: string;
  description: string;
  className?: string;
}

export function StatCard({
  valeur,
  label,
  description,
  className,
}: StatCardProps) {
  return (
    <motion.div
      variants={staggerChild}
      className={cn(
        "flex flex-col items-center text-center gap-4 p-8",
        className
      )}
    >
      <div className="flex items-baseline gap-1">
        <span className="stat-number text-display-xl text-gradient-gold">
          {valeur}
        </span>
        <span className="text-display-md font-serif text-gold-500">
          {label}
        </span>
      </div>
      <p className="text-body-md font-sans text-muted-foreground max-w-md">
        {description}
      </p>
    </motion.div>
  );
}
