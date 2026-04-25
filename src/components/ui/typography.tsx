"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * TYPOGRAPHY COMPONENTS — Design System
 * ═══════════════════════════════════════════════════
 *
 * Composants sémantiques garantissant :
 * - Hiérarchie SEO stricte (un seul H1 par page)
 * - Typographie fluide (responsive sans media queries)
 * - Cohérence visuelle à travers toute la page
 *
 * Usage :
 *   <Heading level={1}>Oser Rêver Grand</Heading>
 *   <Text variant="body-lg">Description...</Text>
 *   <Overline>Conférence 2026</Overline>
 */

// ─── Heading Component ───

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  gradient?: boolean;
  id?: string;
}

const headingStyles: Record<number, string> = {
  1: "text-display-xl font-serif",
  2: "text-display-md font-serif",
  3: "text-heading-lg font-serif",
  4: "text-heading-md font-serif",
  5: "text-heading-sm font-serif",
  6: "text-body-lg font-serif font-semibold",
};

export function Heading({
  level,
  children,
  className,
  as,
  gradient = false,
  id,
}: HeadingProps) {
  const Tag = (as || `h${level}`) as React.ElementType;

  return (
    <Tag
      id={id}
      className={cn(
        headingStyles[level],
        gradient && "text-gradient-gold",
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ─── Text Component ───

interface TextProps {
  variant?: "body-lg" | "body-md" | "body-sm" | "caption";
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
  muted?: boolean;
}

export function Text({
  variant = "body-md",
  children,
  className,
  as: Tag = "p",
  muted = false,
}: TextProps) {
  return (
    <Tag
      className={cn(
        `text-${variant} font-sans`,
        muted && "text-muted-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ─── Overline Component ───

interface OverlineProps {
  children: React.ReactNode;
  className?: string;
}

export function Overline({ children, className }: OverlineProps) {
  return <span className={cn("overline-text", className)}>{children}</span>;
}

// ─── Section Title Component ───

interface SectionTitleProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionTitle({
  overline,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {overline && <Overline>{overline}</Overline>}
      <Heading level={2} className={cn("max-w-3xl", titleClassName)}>
        {title}
      </Heading>
      {align === "center" && <hr className="divider-gold mt-1" />}
      {subtitle && (
        <Text
          variant="body-lg"
          muted
          className="mt-2 max-w-2xl"
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
