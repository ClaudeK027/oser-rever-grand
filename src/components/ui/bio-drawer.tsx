"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text, Heading } from "./typography";
import { SmartAvatar } from "./smart-avatar";
import { EASE_PREMIUM } from "@/lib/animations";

// Custom LinkedIn Icon as it's missing from the installed lucide-react version
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface BioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    role: string;
    bio?: string;
    image?: string;
    linkedinUrl?: string;
  } | null;
}

export function BioDrawer({ isOpen, onClose, member }: BioDrawerProps) {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-night-950/60 backdrop-blur-sm z-[100] xl:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[101] xl:hidden",
              "bg-night-900 border-t border-accent/20 rounded-t-[2.5rem]",
              "shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.5)]",
              "pb-safe pt-2 px-6"
            )}
          >
            {/* Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto my-3" onClick={onClose} />

            <div className="relative pt-6 pb-12 space-y-8">
              {/* Corner Ornament */}
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl" />
              
              {/* Header: Avatar + Identity */}
              <div className="flex items-center gap-5">
                <SmartAvatar
                  name={member.name}
                  image={member.image}
                  size="lg"
                  shape="circle"
                  className="ring-2 ring-accent/20"
                />
                <div className="space-y-1">
                  <Heading level={4} className="font-serif italic text-white leading-tight">
                    {member.name}
                  </Heading>
                  <Text variant="caption" className="text-accent uppercase tracking-widest text-[10px] font-bold">
                    {member.role}
                  </Text>
                </div>
              </div>

              {/* Bio Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent/40" />
                  <Text variant="caption" className="text-white/40 uppercase tracking-[0.2em] text-[9px]">
                    À propos
                  </Text>
                </div>
                <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  <Text variant="body-md" className="text-night-200 leading-relaxed font-sans opacity-90 whitespace-pre-line">
                    {member.bio || "Biographie en cours de rédaction..."}
                  </Text>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between gap-4">
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-accent text-night-950 rounded-2xl font-sans font-bold uppercase tracking-widest text-[11px] shadow-glow-accent-sm active:scale-95 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    Profil LinkedIn
                  </a>
                ) : (
                  <div className="flex-1 py-4 text-center text-white/20 font-sans uppercase tracking-widest text-[10px] border border-white/5 rounded-2xl">
                    Social indisponible
                  </div>
                )}
                
                <button
                  onClick={onClose}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 active:scale-90 transition-all"
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
