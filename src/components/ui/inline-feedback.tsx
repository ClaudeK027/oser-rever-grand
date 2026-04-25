"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/typography";

/**
 * ═══════════════════════════════════════════════════
 * INLINE FEEDBACK — Design System "Oser Rêver Grand"
 * ═══════════════════════════════════════════════════
 *
 * Message de feedback affiché directement sous un champ 
 * de formulaire ou après une action inline.
 *
 * Variantes : success | error | hint
 */

type FeedbackVariant = "success" | "error" | "hint";

interface InlineFeedbackProps {
  /** Message à afficher */
  message: string;
  /** Variante visuelle */
  variant?: FeedbackVariant;
  /** Contrôle de visibilité (pour animer l'entrée/sortie) */
  isVisible?: boolean;
  className?: string;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle2,
    textColor: "text-emerald-600",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: AlertCircle,
    textColor: "text-rose-500",
    iconColor: "text-rose-400",
  },
  hint: {
    icon: Info,
    textColor: "text-muted",
    iconColor: "text-muted",
  },
};

export function InlineFeedback({
  message,
  variant = "hint",
  isVisible = true,
  className,
}: InlineFeedbackProps) {
  const config = feedbackConfig[variant];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn("flex items-center gap-1.5 mt-1.5 overflow-hidden", className)}
          role={variant === "error" ? "alert" : undefined}
          aria-live={variant === "error" ? "assertive" : "polite"}
        >
          <Icon
            icon={config.icon}
            size="sm"
            className={cn("flex-shrink-0", config.iconColor)}
          />
          <Text variant="caption" className={cn(config.textColor)}>
            {message}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
