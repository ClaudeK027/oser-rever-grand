"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { socials } from "@/data/mock";
import { Mail, Phone } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import Image from "next/image";

// Icons custom si lucide-react ne les a pas dans cette version
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// TikTok icon (custom car non inclus dans lucide-react)
// TikTok icon (custom car non inclus dans lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.35 6.35 0 0 0 3.14 15a6.35 6.35 0 0 0 6.35 6.35 6.35 6.35 0 0 0 6.35-6.35V8.75a8.26 8.26 0 0 0 3.75.9V6.22a4.84 4.84 0 0 1 0 .47Z" />
    </svg>
  );
}

// LinkedIn icon (custom)
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Instagram icon (custom)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

/**
 * ═══════════════════════════════════════════════════
 * FOOTER V2 — Design System
 * ═══════════════════════════════════════════════════
 *
 * Pied de page utilisant les composants Atomes standardisés
 */

export function Footer() {
  return (
    <footer
      className={cn(
        "bg-night-900",
        "border-t border-border-subtle"
      )}
      aria-label="Pied de page"
    >
      <div className="container-editorial py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Left — Réseaux sociaux */}
          <div className="flex flex-col gap-4 md:items-start text-center md:text-left">
            <Text variant="caption" className="text-white/60 font-medium tracking-[0.2em] uppercase">
              Rejoignez-nous
            </Text>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="text-white/80 group-hover:text-accent transition-colors" />
              </a>
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon className="text-white/80 group-hover:text-accent transition-colors" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="text-white/80 group-hover:text-accent transition-colors" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="text-white/80 group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Center — Marque */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm shadow-sm flex items-center justify-center">
                <Image 
                  src="/assets/logo-mini.png?v=4" 
                  alt="ORG Logo" 
                  width={24} 
                  height={24} 
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="font-serif text-heading-md text-white">ORG 2026</div>
            </div>
            <Text variant="body-sm" className="text-white/40 max-w-[200px] text-center">
              Transformer la jeunesse gabonaise.
            </Text>
          </div>

          {/* Right — Contact */}
          <div className="flex flex-col gap-4 md:items-end text-center md:text-right">
            <Text variant="caption" className="text-white/60 font-medium tracking-[0.2em] uppercase">
              Nous contacter
            </Text>
            <div className="flex flex-col gap-3">
              <a
                href={socials.email}
                className="flex items-center justify-center md:justify-end gap-3 group"
                aria-label="Envoyer un email"
              >
                <span className="text-[11px] font-sans text-white/50 group-hover:text-accent transition-colors">
                  conference.oserrevergrand@gmail.com
                </span>
                <div className="p-2.5 rounded-full border border-white/10 group-hover:border-accent/40 bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                  <Icon icon={Mail} size="sm" className="text-white/80 group-hover:text-accent transition-colors" />
                </div>
              </a>
              <a
                href={`tel:${socials.phone}`}
                className="flex items-center justify-center md:justify-end gap-3 group"
                aria-label="Appeler"
              >
                <span className="text-[11px] font-sans text-white/50 group-hover:text-accent transition-colors">
                  +241 62 70 79 88
                </span>
                <div className="p-2.5 rounded-full border border-white/10 group-hover:border-accent/40 bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                  <Icon icon={Phone} size="sm" className="text-white/80 group-hover:text-accent transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <Divider className="my-12 border-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Text variant="caption" className="text-white/40">
            © 2026 Oser Rêver Grand. Tous droits réservés.
          </Text>
          <div className="flex gap-6">
            <a href="#" className="text-caption text-white/40 hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="text-caption text-white/40 hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
