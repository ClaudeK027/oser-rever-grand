import type { Variants, Transition } from "framer-motion";

/**
 * ═══════════════════════════════════════════════════════════════
 * ANIMATION LIBRARY — Design System "Oser Rêver Grand" 2026
 * ═══════════════════════════════════════════════════════════════
 *
 * Bibliothèque centralisée de variants Framer Motion.
 * TOUTES les animations du site dérivent de ces presets.
 *
 * Ref: DESIGN_SYSTEM_ARCHITECTURE.md §1.7
 *
 * Principes :
 * - N'animer que opacity + transform (GPU-accelerated)
 * - Toujours utiliser viewport={{ once: true }}
 * - Mouvement cinématique : lent, amorti, jamais brusque (§6.2)
 * - Respecter prefers-reduced-motion (via CSS base layer)
 * ═══════════════════════════════════════════════════════════════
 */


/* ─────────────────────────────────────────────────────────────
   TRANSITION PRESETS
   Ref: §1.7 — Courbes + Durées
   ───────────────────────────────────────────────────────────── */

/** Courbe Apple-style : entrées très amorties */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** Courbe expo : sorties extrêmement douces */
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

/** Courbe par défaut : usage courant */
const EASE_DEFAULT = [0.25, 0.1, 0.25, 1] as const;

/** Durées sémantiques (en secondes) */
export const DURATION = {
  fast: 0.15,
  medium: 0.3,
  slow: 0.6,
  cinematic: 1.0,
} as const;

/** Spring préconfiguré pour les micro-interactions tactiles */
export const SPRING_TACTILE: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Spring pour les entrées de sections */
export const SPRING_SECTION: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};


/* ─────────────────────────────────────────────────────────────
   REVEAL VARIANTS (Apparitions au scroll)
   Usage : <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
   ───────────────────────────────────────────────────────────── */

/** Révélation standard : apparition depuis le bas */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_PREMIUM,
    },
  },
};

/** Apparition depuis la gauche */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_PREMIUM,
    },
  },
};

/** Apparition depuis la droite */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_PREMIUM,
    },
  },
};

/** Zoom léger à l'apparition */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_PREMIUM,
    },
  },
};

/** Apparition purement en fondu (sans déplacement) */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.cinematic,
      ease: "easeOut",
    },
  },
};


/* ─────────────────────────────────────────────────────────────
   STAGGER CONTAINERS
   Usage : parent avec staggerContainer, enfants avec staggerChild
   ───────────────────────────────────────────────────────────── */

/** Conteneur stagger — espace les animations des enfants */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: EASE_DEFAULT,
    },
  },
};

/** Conteneur stagger lent — pour les sections héroïques */
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: EASE_DEFAULT,
    },
  },
};

/** Enfant standard pour stagger (fade + slide up) */
export const staggerChild: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_PREMIUM,
    },
  },
};

/** Enfant scale pour stagger (fade + zoom) */
export const staggerChildScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_PREMIUM,
    },
  },
};


/* ─────────────────────────────────────────────────────────────
   HOVER INTERACTIONS
   Usage : <motion.div whileHover={hoverLift}>
   ───────────────────────────────────────────────────────────── */

/** Micro-lift au survol (cartes) */
export const hoverLift = {
  y: -4,
  transition: {
    duration: DURATION.medium,
    ease: EASE_PREMIUM,
  },
};

/** Échelle subtile au survol (boutons, avatars) */
export const hoverScale = {
  scale: 1.02,
  transition: SPRING_TACTILE,
};

/** Tap amortie (micro-interaction au clic) */
export const tapScale = {
  scale: 0.97,
  transition: SPRING_TACTILE,
};


/* ─────────────────────────────────────────────────────────────
   VIEWPORT CONFIG
   Configuration par défaut pour les animations au scroll
   ───────────────────────────────────────────────────────────── */

/** Viewport standard : déclenche une fois à 20% de visibilité */
export const defaultViewport = {
  once: true,
  amount: 0.2 as const,
};

/** Viewport sensible : déclenche dès que l'élément apparaît */
export const eagerViewport = {
  once: true,
  amount: 0.05 as const,
};


/* ─────────────────────────────────────────────────────────────
   PAGE TRANSITIONS
   Pour les transitions de montage/démontage de page
   ───────────────────────────────────────────────────────────── */

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATION.medium,
      ease: EASE_DEFAULT,
    },
  },
};


/* ─────────────────────────────────────────────────────────────
   NOTIFICATION / TOAST VARIANTS (Sprint 5)
   ───────────────────────────────────────────────────────────── */

/** Entrée depuis la droite (Toasts, panneaux latéraux) */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.95,
    transition: {
      duration: DURATION.fast,
      ease: EASE_DEFAULT,
    },
  },
};

