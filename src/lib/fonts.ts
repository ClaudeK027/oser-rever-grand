import { Inter, Playfair_Display } from "next/font/google";

/**
 * INTER — Sans-serif principal
 * Utilisé pour : corps de texte, navigation, boutons, labels.
 * Optimisé pour la lisibilité sur écran avec des formes ouvertes.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});

/**
 * PLAYFAIR DISPLAY — Serif éditorial
 * Utilisé pour : titres principaux, noms de sections, citations.
 * Apporte le caractère luxueux et éditorial "magazine haut de gamme".
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  adjustFontFallback: true,
});
