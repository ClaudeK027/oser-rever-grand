"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * SMART AVATAR — Design System
 * ═══════════════════════════════════════════════════
 *
 * Avatar intelligent avec fallback premium.
 * Si aucune image n'est fournie, génère un dégradé
 * déterministe basé sur le nom + initiales.
 *
 * Le dégradé est généré à partir d'un hash du nom,
 * garantissant la même couleur pour la même personne.
 *
 * Usage :
 *   <SmartAvatar name="Jessica Allogo" size="lg" />
 *   <SmartAvatar name="Simplice" image="/photo.jpg" size="md" />
 */

interface SmartAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  shape?: "circle" | "rounded";
}

const sizeMap = {
  sm: { container: "w-12 h-12", text: "text-sm", imageSize: 48 },
  md: { container: "w-20 h-20", text: "text-lg", imageSize: 80 },
  lg: { container: "w-32 h-32", text: "text-2xl", imageSize: 128 },
  xl: { container: "w-44 h-44", text: "text-4xl", imageSize: 176 },
};

// Palettes de dégradés Luxe (Ebène, Or, Ardoise, Champagne)
const gradientPalettes = [
  ["#1A1A2E", "#16213E"], // Deep Night
  ["#C5A059", "#8E7037"], // Burnished Gold
  ["#2D3436", "#000000"], // Obsidian
  ["#DFD3C3", "#C7B198"], // Desert Sand (Text dark)
  ["#483434", "#6B4226"], // Walnut
  ["#7F8C8D", "#2C3E50"], // Midnight Steel
  ["#B08D57", "#5D4037"], // Bronze
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function SmartAvatar({
  name,
  image,
  size = "lg",
  className,
  shape = "rounded",
}: SmartAvatarProps) {
  const { container, text, imageSize } = sizeMap[size];
  const initials = getInitials(name);

  // Fallback gradient: we only use elegant curated palettes for the premium look
  const gradient = useMemo(() => {
    const index = hashString(name) % gradientPalettes.length;
    const [from, to] = gradientPalettes[index];
    return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
  }, [name]);

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-2xl";
  const commonFrameClasses = cn(
    container,
    shapeClass,
    "relative overflow-hidden shrink-0",
    "shadow-elevation-1 border border-border-subtle",
    "transition-transform duration-500 ease-premium",
    className
  );

  if (image) {
    return (
      <div className={commonFrameClasses}>
        <Image
          src={image}
          alt={`Photo de ${name}`}
          width={imageSize}
          height={imageSize}
          className="object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700 ease-premium"
        />
        {/* Subtle inner shadow overlay for premium depth */}
        <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={cn(commonFrameClasses, "flex items-center justify-center select-none")}
      style={{ background: gradient }}
      aria-label={`Avatar généré pour ${name}`}
    >
      <span className={cn(
        text, 
        "font-serif font-medium tracking-widest drop-shadow-sm",
        hashString(name) % gradientPalettes.length === 3 ? "text-night-950" : "text-white/95"
      )}>
        {initials}
      </span>
      {/* Texture & Light effects */}
      <div className="absolute inset-0 rounded-inherit bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-white/20 pointer-events-none" />
    </div>
  );
}
