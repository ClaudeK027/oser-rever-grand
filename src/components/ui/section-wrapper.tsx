"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport } from "@/lib/animations";
import { Container } from "./container";
import type { Variants } from "framer-motion";

/**
 * ═══════════════════════════════════════════════════════════════
 * SECTION WRAPPER — Design System "Oser Rêver Grand"
 * ═══════════════════════════════════════════════════════════════
 *
 * Le pilier de la structure de page. Garantit un rythme vertical
 * constant et une sémantique HTML parfaite pour le SEO.
 *
 * Caractéristiques :
 * - Padding vertical standardisé (section-padding)
 * - Support natif des "Dark Sections" (§1.1)
 * - Animation d'entrée au scroll raffinée
 * - Intégration du composant Container (§3.3)
 *
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §3, §4.4
 * ═══════════════════════════════════════════════════════════════
 */

interface SectionWrapperProps {
  children: React.ReactNode;
  /** ID pour l'ancrage dans la navigation */
  id?: string;
  /** Applique le contexte visuel sombre (background-inverse, text-inverse) */
  dark?: boolean;
  /** Définit la largeur max du contenu interne */
  containerVariant?: "editorial" | "narrow" | "full";
  /** Désactive l'animation d'entrée au scroll si faux */
  animate?: boolean;
  /** Variants Framer Motion personnalisés */
  variants?: Variants;
  /** Balise sémantique (défaut: section) */
  as?: "section" | "div" | "article" | "header" | "footer";
  /** Classes CSS pour le wrapper externe */
  className?: string;
  /** Classes CSS pour le conteneur interne */
  containerClassName?: string;
  /** Description pour les lecteurs d'écran */
  "aria-label"?: string;
}

export function SectionWrapper({
  children,
  id,
  dark = false,
  containerVariant = "editorial",
  animate = true,
  variants = fadeInUp,
  as: Tag = "section",
  className,
  containerClassName,
  "aria-label": ariaLabel,
}: SectionWrapperProps) {
  // Choix du composant de base (statique ou animé)
  const MotionTag = animate ? motion.create(Tag) : Tag;

  // Props d'animation (vides si animate=false)
  const animationProps = animate
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: defaultViewport,
        variants: variants,
      }
    : {};

  return (
    <MotionTag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "section-padding w-full relative",
        dark && "dark-section",
        className
      )}
      {...animationProps}
    >
      <Container variant={containerVariant} className={containerClassName}>
        {children}
      </Container>
    </MotionTag>
  );
}
