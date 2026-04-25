"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SmartAvatar } from "./smart-avatar";
import { staggerChild, EASE_PREMIUM, DURATION } from "@/lib/animations";
import { Heading, Text } from "./typography";
import { ExternalLink } from "lucide-react";
import { Icon } from "./icon";

// Custom LinkedIn Icon as it's missing from the installed lucide-react version
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/**
 * ═══════════════════════════════════════════════════
 * PROFILE CARD V2 — Luxury Standard
 * ═══════════════════════════════════════════════════
 *
 * Carte de profil haut de gamme avec effet de révélation
 * (hover reveal) et signature visuelle dynamique.
 */

interface ProfileCardProps {
  variant?: "speaker" | "team";
  name: string;
  role: string;
  description?: string;
  /** Courte bio / citation affichée dans la bulle flottante (team) */
  bio?: string;
  image?: string;
  linkedinUrl?: string;
  className?: string;
  onBioClick?: () => void;
  bubbleAlign?: "left" | "center" | "right";
}

export function ProfileCard({
  variant = "speaker",
  name,
  role,
  description,
  bio,
  image,
  linkedinUrl,
  className,
  onBioClick,
  bubbleAlign = "center",
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [bubblePlacement] = useState<"top" | "bottom">("bottom");
  const articleRef = useRef<HTMLElement | null>(null);

  const BUBBLE_ESTIMATED_HEIGHT = 280;

  const handleTeamEnter = () => {
    setIsHovered(true);
  };

  if (variant === "team") {
    const placeBelow = bubblePlacement === "bottom";
    return (
      <motion.article
        ref={articleRef}
        variants={staggerChild}
        onMouseEnter={handleTeamEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBioClick}
        className={cn(
          "relative flex flex-col items-center text-center gap-5 group cursor-pointer",
          "hover:z-popover",
          "active:scale-95 transition-transform duration-200",
          className
        )}
      >
        {/* ═ Bulle flottante d'information — hover reveal */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: placeBelow ? -10 : 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: placeBelow ? -10 : 10, scale: 0.96 }}
              transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              className={cn(
                "absolute w-96 pointer-events-auto z-popover",
                "hidden xl:block",
                bubbleAlign === "center" && "left-1/2 -translate-x-1/2",
                bubbleAlign === "left" && "left-0",
                bubbleAlign === "right" && "right-0",
                placeBelow ? "top-full pt-3" : "bottom-full pb-3"
              )}
            >
              <div className="relative rounded-2xl bg-night-900/90 border border-[rgba(234,179,8,0.25)] backdrop-blur-editorial shadow-elevation-2 p-5 text-left">
                {/* Corner brackets éditoriaux */}
                <span aria-hidden="true" className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[rgba(234,179,8,0.6)] pointer-events-none" />
                <span aria-hidden="true" className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[rgba(234,179,8,0.6)] pointer-events-none" />
                <span aria-hidden="true" className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[rgba(234,179,8,0.6)] pointer-events-none" />
                <span aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[rgba(234,179,8,0.6)] pointer-events-none" />

                {/* Overline */}
                <div className="flex items-center gap-2 mb-3">
                  <span aria-hidden="true" className="h-px w-6 bg-accent" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                    À propos
                  </span>
                </div>

                {/* Nom en serif italique */}
                <p className="font-serif italic text-white text-body-md leading-snug mb-3">
                  {name}
                </p>

                {/* Bio / citation (vide pour le moment) */}
                <p className="font-sans text-[13px] text-white/65 leading-relaxed min-h-[3.5rem]">
                  {bio || (
                    <span className="italic text-white/30">
                      Bio à venir…
                    </span>
                  )}
                </p>

                {/* Footer meta & Social */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-white/45">
                    <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent animate-pulse-soft" />
                    <span>Équipe Fondatrice</span>
                  </div>
                  
                  {linkedinUrl && (
                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-white/50 hover:text-accent transition-all duration-300"
                      title="Profil LinkedIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LinkedinIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Flèche pointeur vers l'avatar */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute w-3 h-3 rotate-45 bg-night-900/90 pointer-events-none",
                  bubbleAlign === "center" && "left-1/2 -translate-x-1/2",
                  bubbleAlign === "left" && "left-12",
                  bubbleAlign === "right" && "right-12",
                  placeBelow
                    ? "top-[5px] border-l border-t border-[rgba(234,179,8,0.25)]"
                    : "bottom-[5px] border-r border-b border-[rgba(234,179,8,0.25)]"
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═ Avatar avec anneaux premium */}
        <div className="relative">
          {/* Anneau pointillé rotatif — hover */}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 24, ease: "linear", repeat: isHovered ? Infinity : 0 }}
            className="absolute -inset-3 rounded-full border border-dashed border-transparent group-hover:border-[rgba(234,179,8,0.3)] transition-colors duration-500 pointer-events-none"
          />

          <SmartAvatar
            name={name}
            image={image}
            size="lg"
            shape="circle"
            className="relative z-10 group-hover:scale-[1.04] transition-transform duration-500 ease-premium"
          />

          {/* Halo gold sur hover */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-1 ring-inset ring-transparent group-hover:ring-[rgba(234,179,8,0.5)] transition-[box-shadow] duration-500 pointer-events-none z-20 group-hover:shadow-[0_0_40px_-8px_rgba(234,179,8,0.45)]"
          />

          {/* Badge "+" indicateur d'info */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full xl:hidden",
              "bg-night-950 border flex items-center justify-center",
              "border-[rgba(234,179,8,0.4)] group-hover:border-accent group-hover:bg-accent",
              "transition-all duration-500 ease-premium z-30",
              "shadow-[0_2px_8px_-2px_rgba(234,179,8,0.35)]"
            )}
          >
            <span className="font-serif italic text-[12px] leading-none text-accent group-hover:text-night-950 transition-colors duration-300">
              +
            </span>
          </span>
        </div>

        {/* ═ Identité */}
        <div className="space-y-1.5">
          <h3 className="font-serif italic font-medium tracking-wide text-body-md text-white/95 group-hover:text-accent transition-colors duration-500">
            {name}
          </h3>
          <div className="flex items-center gap-2 justify-center">
            <span aria-hidden="true" className="h-px w-4 bg-[rgba(234,179,8,0.4)] group-hover:bg-[rgba(234,179,8,0.7)] transition-colors duration-500" />
            <p className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-[rgba(234,179,8,0.85)]">
              {role}
            </p>
            <span aria-hidden="true" className="h-px w-4 bg-[rgba(234,179,8,0.4)] group-hover:bg-[rgba(234,179,8,0.7)] transition-colors duration-500" />
          </div>
        </div>
      </motion.article>
    );
  }

  // Variant "speaker" (The Luxury V2)
  return (
    <motion.article
      variants={staggerChild}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-500",
        "bg-surface-card border border-border-subtle shadow-elevation-1",
        "hover:shadow-elevation-2 hover:border-accent/20 group cursor-default",
        className
      )}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="mb-6 relative">
        <SmartAvatar
          name={name}
          image={image}
          size="xl"
          shape="rounded"
          className="group-hover:scale-105"
        />
        {/* Abstract corner ornament */}
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-accent/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="space-y-2 relative z-10 w-full">
        <Heading level={6} className="group-hover:text-accent transition-colors duration-300 font-serif italic tracking-wide capitalize text-body-md sm:text-lg">
          {name}
        </Heading>
        <Text variant="caption" className="text-white/40 font-sans font-medium uppercase tracking-[0.3em] text-[8px] sm:text-[9px] block mt-1">
          {role}
        </Text>

        <AnimatePresence>
          {description && (
            <motion.div
              initial={false}
              animate={{ 
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                marginTop: isHovered ? 16 : 0
              }}
              transition={{ duration: DURATION.medium, ease: EASE_PREMIUM }}
              className="overflow-hidden"
            >
              <Text variant="body-sm" className="text-muted leading-relaxed mb-4">
                {description}
              </Text>

              {linkedinUrl && (
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent hover:text-accent-hover transition-colors group/link"
                >
                  <LinkedinIcon className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
                  <span>Voir le profil LinkedIn</span>
                  <ExternalLink size={10} className="opacity-40 group-hover/link:opacity-100 transition-opacity" />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Signature Animated Line */}
      <div className="mt-6 w-12 h-0.5 bg-border-subtle relative overflow-hidden">
        <motion.div
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="absolute inset-0 bg-accent"
        />
      </div>
    </motion.article>
  );
}
