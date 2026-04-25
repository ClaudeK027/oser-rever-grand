"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

/**
 * ═══════════════════════════════════════════════════
 * UI COMPONENTS — Input Premium
 * ═══════════════════════════════════════════════════
 * 
 * Composant de formulaire haut de gamme avec focus 
 * cinématique et typographie héritée.
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-caption font-serif italic text-accent/80 tracking-wide lowercase first-letter:uppercase ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-sm border bg-night-900 px-4 py-2 text-body-md transition-all duration-300",
              "border-white/10 text-white placeholder:text-white/20",
              "focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500/50 focus:border-red-500" : "hover:border-white/20",
              "shadow-inner-stroke",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Subtle glow effect on focus handled by ring classes */}
        </div>
        {(error || helperText) && (
          <Text 
            variant="caption" 
            className={cn(
              "ml-1 font-sans text-[10px] uppercase tracking-widest",
              error ? "text-red-400" : "text-white/40"
            )}
          >
            {error || helperText}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
