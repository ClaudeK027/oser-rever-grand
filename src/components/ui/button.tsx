"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * ATOMS — Button
 * ═══════════════════════════════════════════════════
 *
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §4.1
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-body-sm font-medium transition-colors duration-250 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-night-950 font-semibold shadow-glow-gold hover:bg-gold-400",
        secondary: "bg-surface-card text-foreground shadow-elevation-1 border border-border-subtle hover:bg-background",
        ghost: "hover:bg-accent/10 hover:text-accent text-white/70 transition-colors",
        outline: "border border-accent text-accent hover:bg-accent/10",
      },
      size: {
        sm: "h-9 px-4 py-2",
        default: "h-11 px-6 py-2.5",
        lg: "h-14 px-8 text-body-md rounded-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  magnetEffect?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, magnetEffect, children, ...props }, ref) => {
    // Magnetic Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth the movement out
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetEffect) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      x.set(distanceX * 0.2); // Pull strength (20%)
      y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
      if (!magnetEffect) return;
      x.set(0);
      y.set(0);
    };

    if (magnetEffect) {
      return (
        <motion.button
          style={{ x: springX, y: springY } as any}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={ref as any}
          disabled={isLoading || props.disabled}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(props as any)}
        >
          {isLoading && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {children}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
