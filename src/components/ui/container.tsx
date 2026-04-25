"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════════════════
 * CONTAINER COMPONENT — Design System "Oser Rêver Grand"
 * ═══════════════════════════════════════════════════════════════
 *
 * Composant de mise en page fondamental qui gère le centrage
 * et les marges horizontales sécurisées.
 *
 * Variantes :
 * - editorial : 1200px (standard pour les grilles et visuels)
 * - narrow    : 720px (optimal pour la lecture de texte long)
 * - full      : 100% (usage spécifique pour fonds perdus)
 *
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §3.3
 * ═══════════════════════════════════════════════════════════════
 */

interface ContainerProps {
  children: React.ReactNode;
  variant?: "editorial" | "narrow" | "full";
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  variant = "editorial",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        // Base container styles are defined in globals.css for consistency
        variant === "editorial" && "container-editorial",
        variant === "narrow" && "container-narrow",
        variant === "full" && "container-full",
        className
      )}
    >
      {children}
    </Tag>
  );
}
