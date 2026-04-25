"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerChild } from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * BENTO GRID — Design System
 * ═══════════════════════════════════════════════════
 *
 * Grille modulaire sophistiquée pour présenter des features,
 * des visions ou des membres d'équipe de manière éditoriale.
 */

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid-editorial gap-4 md:gap-6 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  meta,
  tag,
  number,
  editorial = false,
  children,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  /** Badge/icone legacy — affiché à côté du titre si aucun `tag` fourni */
  icon?: React.ReactNode;
  /** Méta haut-gauche : time code, chapitre, étape (ex: "09h00", "Temps 1") */
  meta?: React.ReactNode;
  /** Badge haut-droite : catégorie (ex: "MATINÉE", "CONFÉRENCE") */
  tag?: React.ReactNode;
  /** Grand numéro serif italique gold overlay (ex: "01") — mode Moments Forts */
  number?: React.ReactNode;
  /** Chrome éditorial : corners gold, hover lift + glow, transitions premium */
  editorial?: boolean;
  children?: React.ReactNode;
}) => {
  const hasTopBar = !!(meta || tag);

  return (
    <motion.div
      variants={staggerChild}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        editorial
          ? [
              "p-5 md:p-6 rounded-2xl bg-surface-card",
              "border border-border-subtle",
              "shadow-elevation-1",
              "transition-[transform,box-shadow,border-color] duration-500 ease-premium",
              "hover:-translate-y-1 hover:shadow-elevation-2 hover:border-accent/30",
            ]
          : [
              "p-6 rounded-2xl bg-surface-card border border-border-subtle",
              "shadow-elevation-1 transition-all duration-300",
              "hover:shadow-elevation-2 hover:border-accent/20",
            ],
        "cursor-default",
        className
      )}
    >
      {/* Corners or editorial — apparaissent au hover */}
      {editorial && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/0 group-hover:border-accent/70 transition-colors duration-500 pointer-events-none z-20"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/0 group-hover:border-accent/70 transition-colors duration-500 pointer-events-none z-20"
          />
        </>
      )}

      {/* Grand numéro en filigrane (mode Moments Forts) — Signature Visuelle Premium */}
      {number && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute select-none z-0",
            "font-serif italic leading-none",
            "text-[rgba(var(--accent-rgb),0.10)] group-hover:text-[rgba(var(--accent-rgb),0.15)] transition-colors duration-700 ease-out-expo",
            // Positionné au milieu-droite pour éviter les coins et ne pas masquer le contenu
            "top-2/3 -right-6 -translate-y-1/2" 
          )}
          style={{ fontSize: "12rem" }}
        >
          {number}
        </span>
      )}

      {/* Top bar — méta (gauche) + tag (droite) */}
      {hasTopBar && (
        <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
          {meta ? (
            <span className="font-serif italic text-accent text-lg leading-none">
              {meta}
            </span>
          ) : (
            <span />
          )}
          {tag && <div className="flex-shrink-0">{tag}</div>}
        </div>
      )}

      {/* Header / media */}
      {header && (
        <div
          className={cn(
            "relative z-10 flex w-full overflow-hidden rounded-xl",
            editorial
              ? "min-h-[9rem] transition-transform duration-700 ease-premium group-hover:scale-[1.015]"
              : "flex-1 h-full min-h-[6rem] group-hover:scale-[1.02] transition-transform duration-500 ease-premium"
          )}
        >
          {header}
        </div>
      )}

      {/* Body */}
      <div
        className={cn(
          "relative z-10 space-y-2",
          editorial ? "mt-5" : "",
          !editorial &&
            "group-hover:translate-x-1 transition-transform duration-300"
        )}
      >
        {!hasTopBar && (icon || title) && (
          <div className="flex items-center gap-2">
            {icon && <div className="text-accent">{icon}</div>}
            {title && (
              <h3 className="font-serif text-heading-sm text-foreground">
                {title}
              </h3>
            )}
          </div>
        )}
        {hasTopBar && title && (
          <h3 className="font-serif text-heading-sm text-foreground">
            {title}
          </h3>
        )}
        {editorial && (
          <span
            aria-hidden="true"
            className="block h-[2px] w-8 bg-accent/70 group-hover:w-12 transition-[width] duration-500 ease-premium"
          />
        )}
        {description && (
          <p className="text-body-sm text-muted leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>

      {children && <div className="relative z-10 pt-4">{children}</div>}

      {/* Glow overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none",
          "bg-gradient-to-br from-accent/5 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        )}
      />
    </motion.div>
  );
};
