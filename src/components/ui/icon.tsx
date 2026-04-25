import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * ATOMS — Icon Wrapper
 * ═══════════════════════════════════════════════════
 *
 * Wrapper standardisé pour contraindre la taille et
 * la couleur des icônes de Lucide React.
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §4.1
 */

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted",
      accent: "text-accent",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface IconProps extends React.ComponentPropsWithoutRef<"svg">, VariantProps<typeof iconVariants> {
  icon: LucideIcon;
}

export function Icon({ icon: IconComponent, size, variant, className, ...props }: IconProps) {
  return (
    <IconComponent
      className={cn(iconVariants({ size, variant }), className)}
      {...props}
    />
  );
}
