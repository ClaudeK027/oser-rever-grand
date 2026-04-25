"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { LucideIcon } from "lucide-react";

/**
 * ═══════════════════════════════════════════════════
 * SKELETON — Design System "Oser Rêver Grand" 2026
 * ═══════════════════════════════════════════════════
 *
 * États de chargement premium avec animation shimmer.
 * Remplace les spinners par des silhouettes élégantes.
 *
 * Variantes :
 *   - Skeleton       → Bloc générique (rectangle)
 *   - SkeletonText   → Simule des lignes de texte
 *   - SkeletonAvatar → Cercle pour avatars
 *   - SkeletonCard   → Carte complète (header + text + button)
 *
 * Respecte prefers-reduced-motion (shimmer désactivé).
 */

// ── Base Skeleton ──────────────────────────────────
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Largeur du squelette */
  width?: string | number;
  /** Hauteur du squelette */
  height?: string | number;
  /** Forme arrondie (pill, circle, ou défaut rectangulaire) */
  rounded?: "none" | "sm" | "md" | "lg" | "full" | "pill";
}

export function Skeleton({
  width,
  height,
  rounded = "md",
  className,
  style,
  ...props
}: SkeletonProps) {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    pill: "rounded-full",
  };

  return (
    <div
      className={cn(
        "skeleton-shimmer bg-cream-200",
        roundedMap[rounded],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ── Skeleton Text ──────────────────────────────────
interface SkeletonTextProps {
  /** Nombre de lignes à simuler */
  lines?: number;
  /** Espacement entre les lignes */
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function SkeletonText({
  lines = 3,
  gap = "md",
  className,
}: SkeletonTextProps) {
  const gapMap = { sm: "gap-1.5", md: "gap-2.5", lg: "gap-3.5" };

  // Largeurs progressives pour un effet naturel
  const widths = ["100%", "92%", "78%", "85%", "60%"];

  return (
    <div
      className={cn("flex flex-col", gapMap[gap], className)}
      aria-hidden="true"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={12}
          rounded="sm"
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  );
}

// ── Skeleton Avatar ────────────────────────────────
interface SkeletonAvatarProps {
  /** Taille du cercle en pixels */
  size?: number;
  className?: string;
}

export function SkeletonAvatar({
  size = 48,
  className,
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
      className={cn("flex-shrink-0", className)}
    />
  );
}

// ── Skeleton Card ──────────────────────────────────
interface SkeletonCardProps {
  /** Afficher un header visuel (image placeholder) */
  showHeader?: boolean;
  /** Afficher un bouton en bas */
  showButton?: boolean;
  className?: string;
}

export function SkeletonCard({
  showHeader = true,
  showButton = false,
  className,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card rounded-xl p-6 space-y-5",
        "shadow-elevation-1 border border-border-subtle",
        className
      )}
      aria-hidden="true"
    >
      {/* Header visuel */}
      {showHeader && (
        <Skeleton height={160} rounded="lg" className="w-full" />
      )}

      {/* Contenu texte */}
      <div className="space-y-4">
        {/* Titre */}
        <Skeleton height={20} rounded="sm" style={{ width: "65%" }} />

        {/* Lignes de texte */}
        <SkeletonText lines={2} gap="sm" />
      </div>

      {/* Bouton */}
      {showButton && (
        <Skeleton
          height={44}
          rounded="pill"
          style={{ width: "45%" }}
        />
      )}
    </div>
  );
}
// ── Media Placeholder ──────────────────────────────
interface MediaPlaceholderProps {
  /** Icône facultative à centrer */
  icon?: LucideIcon;
  /** Classe additionnelle pour le conteneur */
  className?: string;
  /** Variante de couleur */
  variant?: "night" | "cream" | "accent";
  /** Chrome éditorial : grille subtile + coins or + triple anneau autour de l'icône */
  editorial?: boolean;
}

export function MediaPlaceholder({
  icon,
  className,
  variant = "night",
  editorial = false,
}: MediaPlaceholderProps) {
  const variantMap = {
    night: "bg-night-950 border-white/5 shadow-inner",
    cream: "bg-gradient-to-br from-cream-50 via-white to-cream-100 border-accent/10",
    accent: "bg-accent/10 border-accent/20",
  };

  const isDark = variant === "night";
  const gridColor = isDark ? "rgba(234,179,8,0.35)" : "var(--color-accent)";
  const cornerColor = isDark ? "rgba(234,179,8,0.45)" : "rgba(234,179,8,0.55)";

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl border",
        variantMap[variant],
        className
      )}
    >
      {/* Shimmer subtil uniquement en mode non-editorial */}
      {!editorial && <Skeleton className="absolute inset-0 opacity-20" />}

      {/* Grille éditoriale (opt-in) */}
      {editorial && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 pointer-events-none",
            isDark ? "opacity-[0.04]" : "opacity-[0.03]"
          )}
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* Corner brackets éditoriaux (opt-in) */}
      {editorial && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-3 left-3 w-5 h-5 border-t border-l pointer-events-none"
            style={{ borderColor: cornerColor }}
          />
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 w-5 h-5 border-t border-r pointer-events-none"
            style={{ borderColor: cornerColor }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 w-5 h-5 border-b border-l pointer-events-none"
            style={{ borderColor: cornerColor }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 w-5 h-5 border-b border-r pointer-events-none"
            style={{ borderColor: cornerColor }}
          />
        </>
      )}

      {/* Icône centrée — anneaux or si editorial */}
      {icon &&
        (editorial ? (
          <div className="relative z-10 flex items-center justify-center">
            <div
              className={cn(
                "relative w-16 h-16 rounded-full border flex items-center justify-center",
                isDark ? "border-accent/30" : "border-accent/25"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-2 rounded-full border",
                  isDark ? "border-accent/18" : "border-accent/15"
                )}
              />
              <Icon
                icon={icon}
                size="md"
                variant={isDark ? "accent" : "default"}
                className={isDark ? "text-accent/70" : "text-accent/60"}
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-700">
            <Icon
              icon={icon}
              size="xl"
              variant={isDark ? "accent" : "default"}
              className="opacity-40"
            />
          </div>
        ))}
    </div>
  );
}
