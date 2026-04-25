import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════════
 * DESIGN TOKENS — "Oser Rêver Grand" 2026
 * ═══════════════════════════════════════════════════════════════
 *
 * Ce fichier est le CERVEAU du Design Système.
 * Aucune valeur ne doit être codée "en dur" dans les composants.
 *
 * Architecture :
 *   Couche 1 — Primitives : Échelles brutes (gold-50→900, night-50→950, cream-50→500)
 *   Couche 2 — Sémantiques : Intentions via CSS variables (bg-primary, text-muted…)
 *   Couche 3 — Composant : Consommées par les fichiers .tsx via les classes Tailwind
 *
 * Référence : /DESIGN_SYSTEM_ARCHITECTURE.md §1.1–§1.7
 * ═══════════════════════════════════════════════════════════════
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ═══════════════════════════════════════════
         §1.2 — TYPOGRAPHIE
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.2
         ═══════════════════════════════════════════ */
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        /* Display — Playfair, titres héroïques */
        "display-xl": [
          "clamp(3rem, 5vw + 1rem, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4vw + 0.5rem, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.75rem, 3vw + 0.25rem, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "display-sm": [
          "clamp(1.5rem, 2.5vw + 0.25rem, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        /* Heading — Playfair, titres de section */
        "heading-lg": [
          "clamp(1.5rem, 2vw + 0.5rem, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "0", fontWeight: "600" },
        ],
        "heading-md": [
          "clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" },
        ],
        "heading-sm": [
          "clamp(1.1rem, 1vw + 0.25rem, 1.375rem)",
          { lineHeight: "1.35", letterSpacing: "0", fontWeight: "600" },
        ],
        /* Body — Inter, texte courant */
        "body-lg": [
          "1.125rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-md": [
          "1rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        /* Utilitaires */
        caption: [
          "0.8125rem",
          { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.04em" },
        ],
        overline: [
          "0.75rem",
          { lineHeight: "1.5", fontWeight: "600", letterSpacing: "0.12em" },
        ],
      },

      /* ═══════════════════════════════════════════
         §1.1 — COULEURS
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.1
         ═══════════════════════════════════════════ */
      colors: {
        /* ─── Primitives : Échelles brutes ─── */
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE799",
          300: "#FFDB66",
          400: "#FFD033",
          500: "#EAB308",
          600: "#CA9A06",
          700: "#A37B04",
          800: "#7C5C03",
          900: "#553F02",
        },
        night: {
          50: "#E8E8EC",
          100: "#C5C5CE",
          200: "#9D9DAD",
          300: "#75758C",
          400: "#56566F",
          500: "#383852",
          600: "#2A2A40",
          700: "#1E1E30",
          800: "#141422",
          900: "#0A0A14",
          950: "#050509",
        },
        cream: {
          50: "#FFFEFB",
          100: "#FDFBF7",
          200: "#FAF5ED",
          300: "#F5EDE0",
          400: "#E8DCC8",
          500: "#D4C9AF",
        },

        /* ─── Sémantiques : via CSS variables ─── */
        background: "var(--color-bg-primary)",
        foreground: "var(--color-text-primary)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
          foreground: "var(--color-accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-text-muted)",
          foreground: "var(--color-text-muted)",
        },
        surface: {
          card: "var(--color-surface-card)",
          elevated: "var(--color-surface-elevated)",
          overlay: "var(--color-surface-overlay)",
        },
        border: {
          DEFAULT: "var(--color-border-default)",
          subtle: "var(--color-border-subtle)",
          accent: "var(--color-border-accent)",
        },
        state: {
          success: "var(--color-state-success)",
          error: "var(--color-state-error)",
          warning: "var(--color-state-warning)",
          info: "var(--color-state-info)",
        },
        /* Accent alphas — échelle standardisée pour compositing */
        "accent-alpha": {
          "05": "var(--accent-alpha-05)",
          "10": "var(--accent-alpha-10)",
          "15": "var(--accent-alpha-15)",
          "20": "var(--accent-alpha-20)",
          "25": "var(--accent-alpha-25)",
          "30": "var(--accent-alpha-30)",
          "40": "var(--accent-alpha-40)",
        },
      },

      /* ═══════════════════════════════════════════
         §1.8 — GRADIENTS SIGNATURE
         ═══════════════════════════════════════════ */
      backgroundImage: {
        "gradient-gold": "var(--gradient-gold)",
        "gradient-gold-mirror": "var(--gradient-gold-mirror)",
        "gradient-light-fade": "var(--gradient-light-fade)",
        "gradient-aurora": "var(--gradient-aurora)",
      },

      /* ═══════════════════════════════════════════
         Hauteurs Navbar & glow accent
         ═══════════════════════════════════════════ */
      height: {
        "nav-compact": "var(--nav-h-compact)",
        "nav-expanded": "var(--nav-h-expanded)",
      },

      /* ═══════════════════════════════════════════
         §1.9 — Z-INDEX SYSTEM
         Prévient les batailles de z-index en production
         ═══════════════════════════════════════════ */
      zIndex: {
        base: "0",
        raised: "10",
        dropdown: "1000",
        sticky: "1100",
        overlay: "1200",
        modal: "1300",
        popover: "1400",
        toast: "1500",
        tooltip: "1600",
        grain: "9999",
      },

      /* ═══════════════════════════════════════════
         §1.3 — SYSTÈME SPATIAL (Grille 8px)
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.3
         ═══════════════════════════════════════════ */
      spacing: {
        /* Grille 8px stricte */
        "0.5": "0.125rem",   /*  2px */
        "1": "0.25rem",      /*  4px */
        "1.5": "0.375rem",   /*  6px */
        "2": "0.5rem",       /*  8px */
        "3": "0.75rem",      /* 12px */
        "4": "1rem",         /* 16px */
        "6": "1.5rem",       /* 24px */
        "8": "2rem",         /* 32px */
        "12": "3rem",        /* 48px */
        "16": "4rem",        /* 64px */
        "20": "5rem",        /* 80px */
        "24": "6rem",        /* 96px */
        "32": "8rem",        /* 128px */
        /* Tokens sémantiques pour sections */
        "section-y": "clamp(4rem, 8vw, 8rem)",
        "section-x": "clamp(1rem, 5vw, 6rem)",
        "container-max": "75rem",
      },

      /* ═══════════════════════════════════════════
         §1.5 — BORDER RADIUS
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.5
         ═══════════════════════════════════════════ */
      borderRadius: {
        none: "0",
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        pill: "9999px",
      },

      /* ═══════════════════════════════════════════
         §1.4 — ÉLÉVATION & PROFONDEUR
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.4
         Inner-stroke technique: inset shadow 1px
         ═══════════════════════════════════════════ */
      boxShadow: {
        /* Niveaux d'élévation avec bordure interne systématique */
        "elevation-0": "none",
        "elevation-1":
          "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)",
        "elevation-2":
          "0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.06)",
        "elevation-3":
          "0 8px 24px rgba(0,0,0,0.1), 0 24px 64px rgba(0,0,0,0.16), inset 0 0 0 1px rgba(0,0,0,0.08)",
        /* Lueur dorée pour CTA */
        "glow-gold":
          "0 0 20px rgba(234,179,8,0.25), 0 0 60px rgba(234,179,8,0.1)",
        /* Inner-stroke seul (pour combiner avec d'autres ombres) */
        "inner-stroke": "inset 0 0 0 1px rgba(0,0,0,0.05)",
        "inner-stroke-light": "inset 0 0 0 1px rgba(255,255,255,0.1)",
        /* Glow accent — 3 intensités pour orbes/boutons premium */
        "glow-accent-sm": "var(--shadow-glow-accent-sm)",
        "glow-accent-md": "var(--shadow-glow-accent-md)",
        "glow-accent-lg": "var(--shadow-glow-accent-lg)",
      },

      /* ═══════════════════════════════════════════
         §1.7 — TOKENS DE MOUVEMENT (Animation)
         Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.7
         ═══════════════════════════════════════════ */
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "counter-tick": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s var(--ease-premium) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.7s var(--ease-premium) forwards",
        "scale-in": "scale-in 0.5s var(--ease-premium) forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "counter-tick": "counter-tick 0.4s var(--ease-premium) forwards",
      },

      /* ─── Transition timing functions ─── */
      transitionDuration: {
        fast: "150ms",
        medium: "300ms",
        slow: "600ms",
        cinematic: "1000ms",
      },
      transitionTimingFunction: {
        "ease-default": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "ease-premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      /* ─── Backdrop blur ─── */
      backdropBlur: {
        xs: "2px",
        editorial: "16px",
        heavy: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
