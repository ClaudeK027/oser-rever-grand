"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FocusTrap from "focus-trap-react";
import { socials } from "@/data/mock";

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

/**
 * ═══════════════════════════════════════════════════
 * NAVBAR v2 — Glass Editorial
 * ═══════════════════════════════════════════════════
 *
 * - Transparente en haut → glass dorée au scroll
 * - Auto-shrink 96px → 64px
 * - Logo sans encadré blanc (subtle gold glow on hover)
 * - CTA "Réserver" pill doré magnétique permanent
 * - Indicateur de section active (dot + underline animé)
 * - Menu mobile : overlay fade + stagger items
 */

export function Navbar({ items = [] }: { items?: NavItem[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  // Section tracking: détecte la section visible pour l'indicateur
  useEffect(() => {
    const ids = items
      .map((i) => i.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  // Scroll lock + Escape key quand le menu mobile est ouvert
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }, 100);
    }
  };

  const goToReservation = () => {
    window.location.href = "/reservation";
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-sticky",
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-medium ease-premium",
          isScrolled
            ? "bg-[var(--glass-nav-scrolled)] backdrop-blur-editorial border-b border-accent/15 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <motion.nav
          className="relative max-w-[1600px] mx-auto px-4 md:px-8 w-full flex items-center justify-between gap-6"
          animate={{
            height: isScrolled ? "var(--nav-h-compact)" : "var(--nav-h-expanded)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo — bare, gold glow on hover */}
          <a
            href="#evenement"
            onClick={(e) => handleNav(e, "#evenement")}
            className="flex-shrink-0 relative group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-night-950"
            aria-label="Retour en haut"
          >
            <motion.div
              animate={{ scale: isScrolled ? 0.85 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/15 blur-xl transition-all duration-slow" />
              <Image
                src="/assets/logo.png?v=4"
                alt="Oser Rêver Grand Logo"
                width={72}
                height={72}
                className="relative object-contain hidden md:block"
                priority
                unoptimized
              />
              <Image
                src="/assets/logo-mini.png?v=4"
                alt="Oser Rêver Grand Logo"
                width={44}
                height={44}
                className="relative object-contain md:hidden"
                priority
                unoptimized
              />
            </motion.div>
          </a>

          {/* Desktop Links */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-x-10">
            {items.map((item, idx) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="relative group py-2"
                >
                  <span
                    className={cn(
                      "font-sans text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-medium",
                      isActive
                        ? "text-accent"
                        : "text-white/75 group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                  {/* Underline animated */}
                  <span
                    className={cn(
                      "absolute left-0 right-0 -bottom-0.5 h-[1px] origin-left bg-accent transition-transform duration-slow ease-premium",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute left-1/2 -translate-x-1/2 -top-2 w-1 h-1 rounded-full bg-accent shadow-glow-accent-sm"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: CTA + Socials + Burger */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Socials — desktop only */}
            <div className="hidden xl:flex items-center gap-3 pr-3 border-r border-white/10">
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors duration-medium"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors duration-medium"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.35 6.35 0 0 0 3.14 15a6.35 6.35 0 0 0 6.35 6.35 6.35 6.35 0 0 0 6.35-6.35V8.75a8.26 8.26 0 0 0 3.75.9V6.22a4.84 4.84 0 0 1 0 .47Z" />
                </svg>
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors duration-medium"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            {/* CTA Réserver — always visible on desktop, pill on mobile */}
            <Button
              variant="primary"
              size="sm"
              magnetEffect
              onClick={goToReservation}
              className="hidden md:inline-flex"
            >
              Réserver
              <Icon icon={ArrowRight} size="sm" className="ml-1.5" />
            </Button>

            {/* Burger (mobile) — éditorial, bordure or, 3 traits custom */}
            <button
              id="mobile-menu-toggle"
              className={cn(
                "xl:hidden group relative inline-flex items-center justify-center",
                "h-11 w-11 rounded-full",
                "border border-accent/35 bg-night-950/50 backdrop-blur-editorial",
                "shadow-[0_4px_20px_-4px_rgba(234,179,8,0.2)]",
                "transition-all duration-medium ease-premium",
                "hover:border-accent hover:bg-accent/15 hover:shadow-[0_6px_24px_-4px_rgba(234,179,8,0.4)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night-950",
                isMobileMenuOpen && "opacity-0 pointer-events-none"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-white group-hover:text-accent transition-colors duration-medium"
                aria-hidden="true"
              >
                <line x1="3" y1="5.5" x2="15" y2="5.5" />
                <line x1="3" y1="9" x2="15" y2="9" />
                <line x1="3" y1="12.5" x2="12" y2="12.5" />
              </svg>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay — fullscreen premium */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <FocusTrap
            active={true}
            focusTrapOptions={{
              allowOutsideClick: true,
              fallbackFocus: "#mobile-menu-toggle",
              checkCanFocusTrap: (containers) =>
                new Promise<void>((resolve) => {
                  const check = () => {
                    if (containers.every((c) => !!c)) resolve();
                    else setTimeout(check, 10);
                  };
                  check();
                }),
            }}
          >
            <motion.div
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-modal xl:hidden bg-night-950/97 backdrop-blur-heavy flex flex-col"
            >
              {/* Header de l'overlay — logo + close button */}
              <div
                className="flex items-center justify-between px-4 md:px-8 flex-shrink-0 border-b border-white/5"
                style={{ height: "var(--nav-h-expanded)" }}
              >
                <div className="flex items-center">
                  <Image
                    src="/assets/logo-mini.png?v=4"
                    alt="Oser Rêver Grand"
                    width={44}
                    height={44}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className={cn(
                    "group inline-flex items-center justify-center",
                    "h-11 w-11 rounded-full",
                    "border border-accent/35 bg-night-950/50 backdrop-blur-editorial",
                    "shadow-[0_4px_20px_-4px_rgba(234,179,8,0.2)]",
                    "transition-all duration-medium ease-premium",
                    "hover:border-accent hover:bg-accent/15 hover:shadow-[0_6px_24px_-4px_rgba(234,179,8,0.4)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
                  )}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="text-white group-hover:text-accent transition-colors duration-medium"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="3" x2="13" y2="13" />
                    <line x1="13" y1="3" x2="3" y2="13" />
                  </svg>
                </button>
              </div>

              <nav className="container-editorial py-10 flex flex-col space-y-2 flex-1 overflow-y-auto">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + idx * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="group block py-4 border-b border-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <Text
                          variant="body-lg"
                          className="font-serif italic text-white group-hover:text-accent transition-colors duration-medium text-2xl"
                        >
                          {item.label}
                        </Text>
                        <Icon
                          icon={ArrowRight}
                          size="sm"
                          className="text-accent/0 group-hover:text-accent -translate-x-2 group-hover:translate-x-0 transition-all duration-medium"
                        />
                      </div>
                      {item.subItems && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 opacity-60">
                          {item.subItems.map((sub, sIdx) => (
                            <a
                              key={sIdx}
                              href={sub.href}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNav(e as never, sub.href);
                              }}
                              className="text-[11px] uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </a>
                  </motion.div>
                ))}

                {/* CTA Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + items.length * 0.06 + 0.1,
                    duration: 0.5,
                  }}
                  className="pt-8"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    magnetEffect
                    onClick={goToReservation}
                    className="w-full"
                  >
                    Réserver ma place
                    <Icon icon={ArrowRight} size="sm" className="ml-2" />
                  </Button>

                  {/* Mobile Socials */}
                  <div className="flex items-center justify-center gap-8 pt-10">
                    <a
                      href={socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-accent transition-colors"
                      aria-label="Facebook"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href={socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-accent transition-colors"
                      aria-label="TikTok"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.35 6.35 0 0 0 3.14 15a6.35 6.35 0 0 0 6.35 6.35 6.35 6.35 0 0 0 6.35-6.35V8.75a8.26 8.26 0 0 0 3.75.9V6.22a4.84 4.84 0 0 1 0 .47Z" />
                      </svg>
                    </a>
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-accent transition-colors"
                      aria-label="Instagram"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="24"
                        height="24"
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
                    </a>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  );
}
