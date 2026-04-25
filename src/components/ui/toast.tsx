"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/typography";

/**
 * ═══════════════════════════════════════════════════
 * TOAST — Design System "Oser Rêver Grand" 2026
 * ═══════════════════════════════════════════════════
 *
 * Notification temporaire premium.
 * S'affiche en bas à droite avec une barre de progression.
 * Auto-dismiss après `duration` ms.
 *
 * Variantes : success | error | info | warning
 * Accessibilité : role="alert", aria-live="polite"
 */

export type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastProps {
  /** Message principal */
  message: string;
  /** Sous-titre optionnel */
  description?: string;
  /** Variante visuelle */
  variant?: ToastVariant;
  /** Durée avant auto-dismiss (ms) */
  duration?: number;
  /** Contrôle de visibilité */
  isVisible: boolean;
  /** Callback de fermeture */
  onClose: () => void;
}

const variantConfig = {
  success: {
    icon: CheckCircle2,
    borderColor: "border-l-emerald-500",
    iconColor: "text-emerald-500",
    bgAccent: "bg-emerald-500/5",
    progressColor: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    borderColor: "border-l-rose-400",
    iconColor: "text-rose-400",
    bgAccent: "bg-rose-400/5",
    progressColor: "bg-rose-400",
  },
  info: {
    icon: Info,
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
    bgAccent: "bg-blue-500/5",
    progressColor: "bg-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    iconColor: "text-amber-500",
    bgAccent: "bg-amber-500/5",
    progressColor: "bg-amber-500",
  },
};

export function Toast({
  message,
  description,
  variant = "info",
  duration = 4000,
  isVisible,
  onClose,
}: ToastProps) {
  const config = variantConfig[variant];
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }

    const interval = 30; // 30ms update
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, duration]);

  // Handle auto-close separately to avoid updating parent during render
  useEffect(() => {
    if (progress <= 0 && isVisible) {
      onClose();
    }
  }, [progress, isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="alert"
          aria-live="polite"
          className={cn(
            "fixed bottom-6 right-6 z-[100] w-[380px] max-w-[calc(100vw-2rem)]",
            "bg-white rounded-xl shadow-elevation-3 overflow-hidden",
            "border border-border-subtle border-l-4",
            config.borderColor
          )}
        >
          <div className={cn("flex items-start gap-3.5 p-4", config.bgAccent)}>
            {/* Icon */}
            <div className={cn("flex-shrink-0 mt-0.5", config.iconColor)}>
              <Icon icon={config.icon} size="lg" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
              <Text variant="body-sm" className="font-semibold text-foreground">
                {message}
              </Text>
              {description && (
                <Text variant="caption" className="text-muted">
                  {description}
                </Text>
              )}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
              aria-label="Fermer la notification"
            >
              <Icon icon={X} size="sm" className="text-muted" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-[3px] w-full bg-border-subtle">
            <motion.div
              className={cn("h-full", config.progressColor)}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.03, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Hook useToast ──────────────────────────────────
// Simplifie l'utilisation du Toast dans les composants parents
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    description?: string;
    variant: ToastVariant;
    isVisible: boolean;
  }>({
    message: "",
    variant: "info",
    isVisible: false,
  });

  const show = useCallback(
    (message: string, variant: ToastVariant = "info", description?: string) => {
      setToast({ message, description, variant, isVisible: true });
    },
    []
  );

  const hide = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return { toast, show, hide };
}
