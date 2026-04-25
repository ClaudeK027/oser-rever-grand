"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { Heading, Text, Button } from "@/components/ui";
import { EASE_PREMIUM } from "@/lib/animations";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "info",
  isLoading = false,
}: ConfirmModalProps) {
  const icons = {
    danger: <AlertTriangle className="w-6 h-6 text-red-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    info: <HelpCircle className="w-6 h-6 text-blue-500" />,
  };

  const buttonVariants = {
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    info: "bg-accent hover:bg-gold-400 text-night-950",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="relative w-full max-w-md bg-night-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header / Icon */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10`}>
                {icons[variant]}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              <Heading level={4} className="text-white mb-2">
                {title}
              </Heading>
              <Text variant="body-sm" className="text-white/60 leading-relaxed">
                {message}
              </Text>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${buttonVariants[variant]}`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
