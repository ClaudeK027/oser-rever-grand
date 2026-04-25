"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Heading, Text } from "./typography";
import { AuroraBackground } from "./aurora-background";
import { ScrollIndicator } from "./scroll-indicator";
import { staggerContainer, staggerChild, defaultViewport } from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * HERO SECTION v2 — Aurora Monumental
 * ═══════════════════════════════════════════════════
 *
 * - fullscreen (min-h-screen) pour respirer
 * - AuroraBackground : orbes dorés animés + grain + gradient night
 * - layout "centered" : overline + titre display-xl + subtitle + CTAs + meta
 * - layout "split"    : inchangé pour les pages secondaires
 * - ScrollIndicator optionnel en bas
 * - bgImage conservé en couche optionnelle (atténuée)
 */

interface HeroSectionProps {
  layout?: "centered" | "split";
  overline?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; onClick?: () => void };
  secondaryCta?: { label: string; onClick?: () => void };
  visual?: React.ReactNode;
  bgImage?: string;
  /** Méta en overline sous les CTAs (ex: "Libreville · 2026") */
  meta?: React.ReactNode;
  /** ID de la section à scroller quand on clique le ScrollIndicator */
  scrollTargetId?: string;
  /** Désactive le ScrollIndicator (si tu veux gérer ailleurs) */
  hideScrollIndicator?: boolean;
  /** Contrôle l'intensité de l'aurora */
  auroraIntensity?: "subtle" | "medium" | "strong";
  className?: string;
}

export function HeroSection({
  layout = "centered",
  overline,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
  bgImage,
  meta,
  scrollTargetId,
  hideScrollIndicator = false,
  auroraIntensity = "medium",
  className,
}: HeroSectionProps) {
  /* ───────── layout SPLIT (inchangé) ───────── */
  if (layout === "split") {
    return (
      <section
        className={cn(
          "relative section-padding overflow-hidden",
          className
        )}
      >
        <AuroraBackground intensity="subtle" />
        <div className="container-editorial relative z-raised grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-8"
          >
            <div className="space-y-4">
              {overline && (
                <motion.div variants={staggerChild} className="overline-text">
                  {overline}
                </motion.div>
              )}
              <motion.div variants={staggerChild}>
                <Heading level={1} className="text-display-lg max-w-[15ch]">
                  {title}
                </Heading>
              </motion.div>
              {subtitle && (
                <motion.div variants={staggerChild}>
                  <Text variant="body-lg" className="text-muted max-w-xl">
                    {subtitle}
                  </Text>
                </motion.div>
              )}
            </div>

            {(primaryCta || secondaryCta) && (
              <motion.div
                variants={staggerChild}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                {primaryCta && (
                  <Button
                    variant="primary"
                    size="lg"
                    magnetEffect
                    onClick={primaryCta.onClick}
                  >
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    variant="outline"
                    size="lg"
                    magnetEffect
                    onClick={secondaryCta.onClick}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>

          {visual && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-elevation-2"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  /* ───────── layout CENTERED — Aurora Monumental ───────── */
  return (
    <section
      className={cn(
        "dark-section relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-white",
        className
      )}
      style={{ paddingTop: "var(--nav-h-expanded)" }}
    >
      <AuroraBackground intensity={auroraIntensity} />

      {/* Image de fond subtile (optionnelle) */}
      {bgImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] hidden md:block"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "luminosity",
          }}
        />
      )}

      {/* Contenu central */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-raised text-center flex flex-col items-center w-full max-w-[min(64rem,100%-2rem)] mx-auto px-4 sm:px-6 py-20"
      >
        {overline && (
          <motion.div
            variants={staggerChild}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/85">
              {overline}
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-accent/60" />
          </motion.div>
        )}

        <motion.div variants={staggerChild} className="w-full">
          <h1
            className={cn(
              "font-serif font-bold text-white text-balance",
              "text-[clamp(2.5rem,10vw,7.5rem)] leading-[1.05] sm:leading-[0.98] tracking-[-0.02em] sm:tracking-[-0.03em]",
              "drop-shadow-[0_4px_40px_rgba(234,179,8,0.2)]"
            )}
            style={{ wordBreak: "normal", overflowWrap: "break-word" }}
          >
            {title}
          </h1>
        </motion.div>

        {subtitle && (
          <motion.div variants={staggerChild} className="mt-8">
            <Text
              variant="body-lg"
              className="text-white/75 max-w-[55ch] mx-auto leading-relaxed"
            >
              {subtitle}
            </Text>
          </motion.div>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            variants={staggerChild}
            className="flex flex-col sm:flex-row items-center gap-4 pt-12"
          >
            {primaryCta && (
              <Button
                variant="primary"
                size="lg"
                magnetEffect
                onClick={primaryCta.onClick}
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                magnetEffect
                onClick={secondaryCta.onClick}
                className="border-white/25 text-white hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>
        )}

        {meta && (
          <motion.div variants={staggerChild} className="pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {meta}
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Visual additionnel (si fourni) */}
      {visual && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="relative z-raised w-full max-w-6xl mx-auto px-4 mt-8"
        >
          {visual}
        </motion.div>
      )}

      {/* Scroll indicator */}
      {!hideScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-raised">
          <ScrollIndicator
            label="Découvrir"
            targetId={scrollTargetId}
          />
        </div>
      )}
    </section>
  );
}
