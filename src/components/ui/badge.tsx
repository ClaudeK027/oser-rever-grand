import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * ATOMS — Badge
 * ═══════════════════════════════════════════════════
 *
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §4.1
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-caption font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background shadow-elevation-1 hover:bg-foreground/80",
        accent: "border-transparent bg-gold-400 text-night-900 shadow-glow-gold hover:bg-gold-500",
        outline: "text-foreground border border-border-subtle hover:bg-surface-card",
        subtle: "border-transparent bg-surface-card text-muted hover:bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
