"use client";

/**
 * ═══════════════════════════════════════════════════
 * SPRINT 1 — SHOWCASE DES DESIGN TOKENS
 * ═══════════════════════════════════════════════════
 *
 * Cette page est un "laboratoire visuel" qui affiche
 * UNIQUEMENT les fondations du Design Système :
 * - Palette de couleurs (Primitives + Sémantiques)
 * - Échelle typographique complète
 * - Système spatial (grille 8px)
 * - Élévation & profondeur (inner-stroke)
 * - Border radius
 * - Tokens de mouvement
 *
 * Aucun composant React custom n'est utilisé ici.
 * C'est du HTML + Tailwind pur pour tester les tokens.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  staggerContainerSlow,
  defaultViewport,
  DURATION,
  EASE_PREMIUM,
} from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Heading, Text } from "@/components/ui/typography";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ProfileCard } from "@/components/ui/profile-card";
import { VisionCard } from "@/components/ui/vision-card";
import { HeroSection } from "@/components/ui/hero-section";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Star, Sparkles, Send, Lightbulb, Target, Zap, Waves, CheckCircle2, AlertCircle, Bell } from "lucide-react";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from "@/components/ui/skeleton";
import { Toast, useToast } from "@/components/ui/toast";
import { InlineFeedback } from "@/components/ui/inline-feedback";

export default function Sprint1Showcase() {
  const [animKey, setAnimKey] = useState(0);
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [feedbackState, setFeedbackState] = useState<"idle" | "success" | "error">("idle");
  const { toast, show: showToast, hide: hideToast } = useToast();

  const replayAnimations = () => setAnimKey((prev) => prev + 1);
  return (
    <main className="min-h-screen bg-background">
      {/* Toast global */}
      <Toast
        message={toast.message}
        description={toast.description}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      {/* ═══════════════════════════════════════
          SECTION 1 — PALETTE DE COULEURS
          ═══════════════════════════════════════ */}
      <section id="sprint-1" className="section-padding pt-24" aria-label="Palette de couleurs">
        <div className="container-editorial space-y-16">
          {/* Header */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-4"
          >
            <motion.span variants={staggerChild} className="overline-text block">
              Sprint 1 — Design Tokens
            </motion.span>
            <motion.h1
              variants={staggerChild}
              className="font-serif text-display-lg"
            >
              Palette de Couleurs
            </motion.h1>
            <motion.p
              variants={staggerChild}
              className="text-body-lg text-muted max-w-2xl"
            >
              Chaque couleur a une intention. Les primitives sont des échelles brutes,
              les sémantiques sont ce que les composants consomment.
            </motion.p>
          </motion.div>

          {/* Primitives : Gold */}
          <div className="space-y-4">
            <h2 className="font-serif text-heading-md">Gold (Accent)</h2>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[
                { shade: "50", bg: "bg-gold-50" },
                { shade: "100", bg: "bg-gold-100" },
                { shade: "200", bg: "bg-gold-200" },
                { shade: "300", bg: "bg-gold-300" },
                { shade: "400", bg: "bg-gold-400" },
                { shade: "500", bg: "bg-gold-500" },
                { shade: "600", bg: "bg-gold-600" },
                { shade: "700", bg: "bg-gold-700" },
                { shade: "800", bg: "bg-gold-800" },
                { shade: "900", bg: "bg-gold-900" },
              ].map((c) => (
                <div key={c.shade} className="space-y-1">
                  <div
                    className={`${c.bg} w-full aspect-square rounded-md shadow-inner-stroke`}
                  />
                  <p className="text-caption text-center text-muted">{c.shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Primitives : Night */}
          <div className="space-y-4">
            <h2 className="font-serif text-heading-md">Night (Texte & Fond Sombre)</h2>
            <div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
              {[
                { shade: "50", bg: "bg-night-50" },
                { shade: "100", bg: "bg-night-100" },
                { shade: "200", bg: "bg-night-200" },
                { shade: "300", bg: "bg-night-300" },
                { shade: "400", bg: "bg-night-400" },
                { shade: "500", bg: "bg-night-500" },
                { shade: "600", bg: "bg-night-600" },
                { shade: "700", bg: "bg-night-700" },
                { shade: "800", bg: "bg-night-800" },
                { shade: "900", bg: "bg-night-900" },
                { shade: "950", bg: "bg-night-950" },
              ].map((c) => (
                <div key={c.shade} className="space-y-1">
                  <div
                    className={`${c.bg} w-full aspect-square rounded-md shadow-inner-stroke`}
                  />
                  <p className="text-caption text-center text-muted">{c.shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Primitives : Cream */}
          <div className="space-y-4">
            <h2 className="font-serif text-heading-md">Cream (Fond Éditorial)</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { shade: "50", bg: "bg-cream-50" },
                { shade: "100", bg: "bg-cream-100" },
                { shade: "200", bg: "bg-cream-200" },
                { shade: "300", bg: "bg-cream-300" },
                { shade: "400", bg: "bg-cream-400" },
                { shade: "500", bg: "bg-cream-500" },
              ].map((c) => (
                <div key={c.shade} className="space-y-1">
                  <div
                    className={`${c.bg} w-full aspect-square rounded-md shadow-inner-stroke border border-border-subtle`}
                  />
                  <p className="text-caption text-center text-muted">{c.shade}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider-subtle" />

          {/* Sémantiques */}
          <div className="space-y-4">
            <h2 className="font-serif text-heading-md">Tokens Sémantiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card-elevated p-6 space-y-2">
                <div className="w-12 h-12 rounded-md bg-background shadow-inner-stroke border border-border-subtle" />
                <p className="text-caption font-semibold">bg-primary</p>
                <p className="text-body-sm text-muted">#FDFBF7</p>
              </div>
              <div className="card-elevated p-6 space-y-2">
                <div className="w-12 h-12 rounded-md bg-foreground" />
                <p className="text-caption font-semibold">text-primary</p>
                <p className="text-body-sm text-muted">#141422</p>
              </div>
              <div className="card-elevated p-6 space-y-2">
                <div className="w-12 h-12 rounded-md bg-accent" />
                <p className="text-caption font-semibold">accent</p>
                <p className="text-body-sm text-muted">#EAB308</p>
              </div>
              <div className="card-elevated p-6 space-y-2">
                <div className="w-12 h-12 rounded-md bg-state-error" />
                <p className="text-caption font-semibold">state-error</p>
                <p className="text-body-sm text-muted">Rose désaturé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — ÉCHELLE TYPOGRAPHIQUE
          ═══════════════════════════════════════ */}
      <section
        className="section-padding bg-cream-200/50"
        aria-label="Échelle typographique"
      >
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Typographie</span>
            <h2 className="font-serif text-display-md">
              Échelle Typographique Fluide
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Chaque niveau possède sa taille fluide (clamp), son line-height,
              son letter-spacing et son poids. Redimensionnez la fenêtre pour
              voir la fluidité.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-8"
          >
            {[
              { label: "Display XL", cls: "text-display-xl font-serif", text: "Oser Rêver Grand" },
              { label: "Display LG", cls: "text-display-lg font-serif", text: "Inspirer la Jeunesse" },
              { label: "Display MD", cls: "text-display-md font-serif", text: "Transformer les Rêves" },
              { label: "Heading LG", cls: "text-heading-lg font-serif", text: "Notre Vision pour le Gabon" },
              { label: "Heading MD", cls: "text-heading-md font-serif", text: "Innovation et Entrepreneuriat" },
              { label: "Heading SM", cls: "text-heading-sm font-serif", text: "Engagement et Impact" },
              { label: "Body LG",    cls: "text-body-lg font-sans",   text: "La conférence vise à inspirer les jeunes gabonais à croire en leur potentiel." },
              { label: "Body MD",    cls: "text-body-md font-sans",   text: "Partager des histoires de réussite pour montrer que tout est possible." },
              { label: "Body SM",    cls: "text-body-sm font-sans",   text: "Encourager chaque jeune à dépasser ses limites et oser rêver grand." },
              { label: "Caption",    cls: "text-caption font-sans",   text: "Conférence 2026 — Libreville, Gabon" },
              { label: "Overline",   cls: "text-overline font-sans uppercase", text: "Design System Premium" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={staggerChild}
                className="flex flex-col sm:flex-row sm:items-baseline gap-3 pb-6 border-b border-border-subtle"
              >
                <span className="text-caption text-muted font-mono w-28 shrink-0">
                  {item.label}
                </span>
                <span className={item.cls}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — ÉLÉVATION & PROFONDEUR
          ═══════════════════════════════════════ */}
      <section className="section-padding" aria-label="Élévation et profondeur">
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Profondeur</span>
            <h2 className="font-serif text-display-md">
              Système d&apos;Élévation
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Du plat (niveau 0) au flottant (niveau 3). Chaque niveau inclut
              systématiquement un liseré interne semi-transparent (inner-stroke).
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { level: "0", shadow: "shadow-elevation-0", desc: "Fond plat" },
              { level: "1", shadow: "shadow-elevation-1", desc: "Cartes au repos" },
              { level: "2", shadow: "shadow-elevation-2", desc: "Cartes au survol" },
              { level: "3", shadow: "shadow-elevation-3", desc: "Modals & Overlays" },
            ].map((el) => (
              <motion.div
                key={el.level}
                variants={staggerChild}
                className={`${el.shadow} bg-surface-card rounded-md p-8 space-y-3`}
              >
                <p className="font-serif text-heading-md">Niveau {el.level}</p>
                <p className="text-body-sm text-muted">{el.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Glow Gold */}
          <div className="flex justify-center pt-8">
            <div className="shadow-glow-gold bg-accent rounded-pill px-8 py-4 text-foreground font-semibold">
              Glow Gold — CTA Principal
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — BORDER RADIUS
          ═══════════════════════════════════════ */}
      <section
        className="section-padding bg-cream-200/50"
        aria-label="Border radius"
      >
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Géométrie</span>
            <h2 className="font-serif text-display-md">Border Radius</h2>
            <p className="text-body-lg text-muted">
              Échelle stricte. Aucun rayon arbitraire.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "none", cls: "rounded-none" },
              { name: "sm (6px)", cls: "rounded-sm" },
              { name: "md (12px)", cls: "rounded-md" },
              { name: "lg (20px)", cls: "rounded-lg" },
              { name: "xl (28px)", cls: "rounded-xl" },
              { name: "pill", cls: "rounded-pill" },
            ].map((r) => (
              <div key={r.name} className="space-y-2 text-center">
                <div
                  className={`${r.cls} w-20 h-20 mx-auto bg-gold-500/15 shadow-inner-stroke border border-border-accent`}
                />
                <p className="text-caption text-muted">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — BOUTONS & INTERACTIONS
          ═══════════════════════════════════════ */}
      <section className="section-padding" aria-label="Boutons et interactions">
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Interactions</span>
            <h2 className="font-serif text-display-md">
              Boutons & États
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="btn-primary">S&apos;inscrire</button>
            <button className="btn-secondary">En savoir plus</button>
            <button className="btn-primary" disabled>
              Désactivé
            </button>
            <span className="badge">Intervenante 2026</span>
          </div>

          {/* Dividers */}
          <div className="space-y-6 pt-8">
            <h3 className="font-serif text-heading-sm">Séparateurs</h3>
            <hr className="divider-gold" />
            <hr className="divider-subtle" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — MOUVEMENT
          ═══════════════════════════════════════ */}
      <section
        className="section-padding bg-cream-200/50"
        aria-label="Tokens de mouvement"
      >
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Mouvement</span>
            <h2 className="font-serif text-display-md">
              Animations & Transitions
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-body-lg text-muted max-w-2xl">
                Scrollez ou utilisez le bouton pour voir les éléments ci-dessous apparaître avec
                la courbe <code className="text-caption bg-cream-300 px-1.5 py-0.5 rounded-sm">ease-premium</code> (Apple-style).
              </p>
              <button
                onClick={replayAnimations}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                🔄 Rejouer l'animation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Stagger Display */}
            <motion.div
              key={`stagger-${animKey}`}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { title: "Apparition 1", delay: 0 },
                { title: "Apparition 2", delay: 1 },
                { title: "Apparition 3", delay: 2 },
                { title: "Apparition 4", delay: 3 },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerChild}
                  className="card-elevated p-6 space-y-2"
                >
                  <p className="font-serif text-heading-sm">{item.title}</p>
                  <p className="text-caption text-muted">Courbe : ease-premium</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Hover Playground */}
            <div className="card-elevated p-8 flex flex-col items-center justify-center gap-6 border-dashed border-2 border-border-subtle bg-transparent">
              <p className="text-body-sm font-semibold uppercase tracking-widest text-muted">
                Test de Courbe (Hover)
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: DURATION.medium, ease: EASE_PREMIUM }}
                className="w-32 h-32 bg-accent rounded-xl shadow-glow-gold flex items-center justify-center cursor-pointer"
              >
                <span className="text-foreground font-bold">Survolez-moi</span>
              </motion.div>
              <p className="text-caption text-center text-muted">
                Ressentez l&apos;inertie et la fluidité de la courbe <br />
                <code className="text-[10px]">Ease: [0.25, 0.4, 0.25, 1.0]</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — DARK SECTION (contexte inversé)
          ═══════════════════════════════════════ */}
      <section
        className="dark-section section-padding bg-background"
        aria-label="Section sombre"
      >
        <div className="container-editorial space-y-12">
          <div className="space-y-4">
            <span className="overline-text">Contexte Inversé</span>
            <h2 className="font-serif text-display-md text-[var(--color-text-primary)]">
              Mode Dark Section
            </h2>
            <p className="text-body-lg text-[var(--color-text-muted)] max-w-2xl">
              Les mêmes tokens sémantiques s&apos;adaptent automatiquement.
              Les cartes, bordures et textes changent de registre
              sans aucune classe supplémentaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-elevated p-8 space-y-3">
              <p className="font-serif text-heading-sm text-[var(--color-text-primary)]">
                Carte élevée
              </p>
              <p className="text-body-sm text-[var(--color-text-muted)]">
                Inner-stroke lumineux adapté au fond sombre.
              </p>
            </div>
            <div className="card-glass p-8 space-y-3">
              <p className="font-serif text-heading-sm text-[var(--color-text-primary)]">
                Carte Glass
              </p>
              <p className="text-body-sm text-[var(--color-text-muted)]">
                Glassmorphism avec backdrop-blur contrôlé.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="btn-primary">CTA Principal</button>
            <button className="btn-secondary">
              CTA Secondaire
            </button>
            <span className="badge">Badge</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPRINT 2 — SQUELETTE ET ACCESSIBILITÉ
          ═══════════════════════════════════════ */}
      <section
        id="sprint-2"
        className="section-padding bg-cream-100 relative"
        aria-label="Tests du Squelette et Accessibilité"
      >
        <div className="container-editorial space-y-12">
          {/* Header Sprint 2 */}
          <div className="space-y-4 border-b border-border-subtle pb-8">
            <span className="overline-text text-accent">Sprint 2 — Le Squelette</span>
            <h2 className="font-serif text-display-md">
              Grilles & Accessibilité
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Section dédiée à la vérification des conteneurs, de la grille éditoriale,
              et de la navigation au clavier (Focus Ring). Appuyez sur <kbd className="px-2 py-1 bg-white rounded-sm shadow-sm text-caption">Tab</kbd> pour naviguer.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="font-serif text-heading-md">1. Grille Éditoriale (3.2)</h3>
            <p className="text-body-sm text-muted mb-4">
              La grille passe de 4 colonnes (mobile) à 8 (tablette) puis 12 (desktop).
              Les éléments ci-dessous s'adaptent selon `col-span`.
            </p>
            <div className="grid-editorial">
              <div className="col-span-4 md:col-span-4 lg:col-span-8 bg-surface-card p-6 rounded-md shadow-inner-stroke border border-border-subtle">
                <p className="font-serif text-heading-sm">Bloc Principal</p>
                <p className="text-body-sm text-muted">col-span-4 / 4 / 8</p>
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-4 bg-accent/10 p-6 rounded-md shadow-inner-stroke border border-accent/20">
                <p className="font-serif text-heading-sm text-accent-text">Bloc Secondaire</p>
                <p className="text-body-sm text-accent-text/80">col-span-4 / 4 / 4</p>
              </div>
              <div className="col-span-2 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-md shadow-elevation-1 border border-border-subtle">
                <p className="font-serif text-heading-sm">Quart</p>
                <p className="text-body-sm text-muted">col-span-2 / 2 / 3</p>
              </div>
              <div className="col-span-2 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-md shadow-elevation-1 border border-border-subtle">
                <p className="font-serif text-heading-sm">Quart</p>
                <p className="text-body-sm text-muted">col-span-2 / 2 / 3</p>
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-6 bg-night-900 p-6 rounded-md shadow-elevation-2 dark-section">
                <p className="font-serif text-heading-sm text-[var(--color-text-primary)]">Moitié (Dark)</p>
                <p className="text-body-sm text-[var(--color-text-muted)]">col-span-4 / 4 / 6</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <h3 className="font-serif text-heading-md">2. Focus States (A11y 2.2)</h3>
            <p className="text-body-sm text-muted mb-4">
              Vérifiez le contraste du Focus Ring en naviguant avec le clavier.
            </p>
            <div className="flex flex-wrap gap-4 p-8 bg-white rounded-lg shadow-inner-stroke border border-border-subtle">
              <a href="#" className="text-accent underline font-medium underline-offset-4 decoration-2 hover:text-accent-text transition-colors">Lien standard</a>
              <button className="btn-primary">Bouton Primaire</button>
              <button className="btn-secondary">Bouton Secondaire</button>
              <input type="text" placeholder="Input texte" className="px-4 py-2 bg-surface-card border border-border-subtle rounded-md text-body-sm placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPRINT 3 — LES ATOMES
          ═══════════════════════════════════════ */}
      <section
        id="sprint-3"
        className="section-padding bg-background relative"
        aria-label="Tests des Atomes (Sprint 3)"
      >
        <div className="container-editorial space-y-12">
          {/* Header Sprint 3 */}
          <div className="space-y-4 border-b border-border-subtle pb-8">
            <span className="overline-text text-accent">Sprint 3 — Les Atomes</span>
            <h2 className="font-serif text-display-md">
              Composants de Base
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Les blocs de construction fondamentaux. Ces composants embarquent
              toute la logique d'accessibilité et les animations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
            {/* Colonne Gauche */}
            <div className="space-y-12">
              <div className="space-y-6">
                <Heading level={3}>1. Boutons & Effet Magnet</Heading>
                <div className="flex flex-wrap gap-4 items-center p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                  <Button variant="primary" magnetEffect>
                    S'inscrire <Icon icon={ArrowRight} size="sm" className="ml-2" />
                  </Button>
                  <Button variant="secondary" magnetEffect>En savoir plus</Button>
                  <Button variant="outline">Action</Button>
                  <Button variant="ghost">Annuler</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                  <Button size="lg" variant="primary">Grand Format</Button>
                  <Button size="sm" variant="secondary">Petit</Button>
                  <Button isLoading>Chargement</Button>
                  <Button disabled>Désactivé</Button>
                </div>
              </div>

              <div className="space-y-6">
                <Heading level={3}>2. Badges Sémantiques</Heading>
                <div className="flex flex-wrap gap-4 items-center p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                  <Badge variant="default">Nouveau</Badge>
                  <Badge variant="accent">
                    <Icon icon={Sparkles} size="sm" className="mr-1.5" /> Premium
                  </Badge>
                  <Badge variant="outline">En cours</Badge>
                  <Badge variant="subtle">Archive</Badge>
                </div>
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="space-y-12">
              <div className="space-y-6">
                <Heading level={3}>3. Iconographie (Lucide + Wrapper)</Heading>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                  <div className="flex flex-col items-center gap-2">
                    <Icon icon={Star} size="sm" />
                    <Text variant="caption" className="text-muted">sm (16px)</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon icon={Star} size="md" />
                    <Text variant="caption" className="text-muted">md (20px)</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon icon={Star} size="lg" variant="accent" />
                    <Text variant="caption" className="text-muted">lg accent</Text>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon icon={Star} size="xl" variant="muted" />
                    <Text variant="caption" className="text-muted">xl muted</Text>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Heading level={3}>4. Séparateurs (Dividers)</Heading>
                <div className="p-8 space-y-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="text-muted">Divider Horizontal Complet</Text>
                    <Divider />
                  </div>
                  
                  <div className="flex items-center space-x-4 h-12">
                    <Text variant="body-sm">Option A</Text>
                    <Divider orientation="vertical" />
                    <Text variant="body-sm" className="text-muted">Option B</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPRINT 4 — LES ORGANISMES
          ═══════════════════════════════════════ */}
      <section
        id="sprint-4"
        className="section-padding bg-cream-100/50 relative overflow-hidden"
        aria-label="Tests des Organismes (Sprint 4)"
      >
        {/* Background purely decorative mask */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="container-editorial space-y-16">
          {/* Header Sprint 4 */}
          <div className="space-y-4 border-b border-border-subtle pb-8">
            <span className="overline-text text-accent">Sprint 4 — Les Organismes</span>
            <h2 className="font-serif text-display-md">
              Signatures & Bento System
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Combinaison d'Atomes pour créer des structures complexes. 
              Survolez les cartes de profil pour tester le <strong>Hover Reveal</strong>.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-12"
          >
            {/* 1. ProfileCard V2 Showcase */}
            <div className="space-y-8">
              <Heading level={3}>1. Profile Cards (Luxe V2)</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileCard 
                  name="Jessica Allogo"
                  role="Fondatrice"
                  description="Ancienne ingénieure pétrolière reconvertie dans la gastronomie, Jessica insuffle une vision d'excellence et de rigueur à Oser Rêver Grand."
                  image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
                />
                <ProfileCard 
                  name="Yannick Ebibi"
                  role="Intervenant Tech"
                  description="Expert en intelligence artificielle et transformation numérique, il accompagne la jeunesse vers les métiers de demain."
                />
                <ProfileCard 
                  name="Sarah Moussavou"
                  role="Coach Leadership"
                  description="Spécialiste de la psychologie positive, elle aide les participants à briser leurs plafonds de verre mentaux."
                  image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
                />
              </div>
            </div>

            {/* 2. BentoGrid System Showcase */}
            <div className="space-y-8 pt-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <Heading level={3}>2. Bento Grid System</Heading>
                  <Text variant="body-sm" className="text-muted">Layout éditorial 2026</Text>
                </div>
                <Badge variant="accent">Modular Grid</Badge>
              </div>

              <BentoGrid>
                {/* Large Item (col-span-8) */}
                <BentoGridItem
                  title="Vision d'Excellence"
                  description="Nous croyons que chaque jeune gabonais possède un potentiel de classe mondiale qui ne demande qu'à être structuré."
                  header={<div className="w-full h-full bg-gradient-to-br from-night-900 to-night-800 flex items-center justify-center">
                    <Icon icon={Sparkles} size="xl" variant="accent" />
                  </div>}
                  className="col-span-4 lg:col-span-8"
                  icon={<Lightbulb size={24} />}
                />

                {/* Vertical Vision Card in Bento */}
                <VisionCard 
                  titre="Impact Durable"
                  points={["Mentorat", "Réseautage", "Bourses"]}
                  accentColor="gold"
                  className="col-span-4 lg:col-span-4"
                />

                {/* Responsive Items */}
                <BentoGridItem
                  title="Innovation"
                  description="Utiliser les outils de demain."
                  className="col-span-2 lg:col-span-3"
                  icon={<Zap size={20} />}
                />
                <BentoGridItem
                  title="Rigueur"
                  description="Le détail fait la perfection."
                  className="col-span-2 lg:col-span-3"
                  icon={<Target size={20} />}
                />
                <BentoGridItem
                  title="Fluidité"
                  description="Une expérience sans friction."
                  className="col-span-4 lg:col-span-6"
                  icon={<Waves size={20} />}
                  header={<div className="w-full h-full bg-accent/10 flex items-center justify-center">
                    <div className="flex gap-2">
                      <div className="w-2 h-8 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-12 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-6 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>}
                />
              </BentoGrid>
            </div>

            {/* 3. HeroSection Template Showcase */}
            <div className="space-y-8 pt-12">
              <Heading level={3}>3. HeroSection Template</Heading>
              <div className="border border-border-subtle rounded-3xl overflow-hidden shadow-elevation-1">
                <HeroSection 
                  layout="split"
                  overline="Édition 2026"
                  title={<>Oser Rêver <span className="text-accent">Grand</span></>}
                  subtitle="Une Masterclass immersive pour doter la jeunesse gabonaise des outils nécessaires pour redéfinir son avenir."
                  primaryCta={{ label: "Prendre ma place" }}
                  secondaryCta={{ label: "Découvrir le programme" }}
                  visual={
                    <div className="w-full h-full bg-night-900 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-overlay grayscale" />
                      <div className="relative z-10 w-32 h-32 rounded-full border border-accent/30 flex items-center justify-center">
                        <Icon icon={Sparkles} size="xl" variant="accent" />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPRINT 5 — L'EXPÉRIENCE
          ═══════════════════════════════════════ */}
      <section
        id="sprint-5"
        className="section-padding bg-background relative"
        aria-label="Tests de l'Expérience (Sprint 5)"
      >
        <div className="container-editorial space-y-16">
          {/* Header Sprint 5 */}
          <div className="space-y-4 border-b border-border-subtle pb-8">
            <span className="overline-text text-accent">Sprint 5 — L&apos;Expérience</span>
            <h2 className="font-serif text-display-md">
              Feedback &amp; Loading States
            </h2>
            <p className="text-body-lg text-muted max-w-2xl">
              Des indicateurs de chargement élégants et des retours visuels 
              immédiats pour une expérience utilisateur premium.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-16"
          >
            {/* 1. Skeleton Loaders */}
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <Heading level={3}>1. Skeleton Loaders</Heading>
                  <Text variant="body-sm" className="text-muted">
                    Silhouettes animées qui simulent le contenu à venir
                  </Text>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSkeletons(!showSkeletons)}
                >
                  {showSkeletons ? "Masquer" : "Afficher"}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {showSkeletons && (
                  <motion.div
                    key="skeletons"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                  >
                    {/* Skeleton Base */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle space-y-6">
                        <Text variant="body-sm" className="font-semibold uppercase tracking-widest text-muted">Éléments de base</Text>
                        <div className="flex items-center gap-4">
                          <SkeletonAvatar size={56} />
                          <div className="flex-1 space-y-2">
                            <Skeleton height={14} rounded="sm" style={{ width: "60%" }} />
                            <Skeleton height={10} rounded="sm" style={{ width: "40%" }} />
                          </div>
                        </div>
                        <SkeletonText lines={3} />
                        <Skeleton height={44} rounded="pill" style={{ width: "50%" }} />
                      </div>

                      {/* Skeleton Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <SkeletonCard showHeader showButton />
                        <SkeletonCard showHeader={false} showButton />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Toast Notifications */}
            <div className="space-y-8">
              <div className="space-y-2">
                <Heading level={3}>2. Toast Notifications</Heading>
                <Text variant="body-sm" className="text-muted">
                  Cliquez pour déclencher les différentes variantes
                </Text>
              </div>

              <div className="flex flex-wrap gap-4 p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast("Inscription réussie !", "success", "Votre place a été réservée pour la conférence.")}
                >
                  <Icon icon={CheckCircle2} size="sm" className="mr-2" /> Succès
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast("Erreur de validation", "error", "Veuillez vérifier vos informations.")}
                >
                  <Icon icon={AlertCircle} size="sm" className="mr-2" /> Erreur
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast("Nouvelle mise à jour", "info", "Le programme de la conférence a été mis à jour.")}
                >
                  <Icon icon={Bell} size="sm" className="mr-2" /> Info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast("Places limitées", "warning", "Il ne reste que 12 places disponibles.")}
                >
                  ⚠️ Warning
                </Button>
              </div>
            </div>

            {/* 3. Inline Feedback */}
            <div className="space-y-8">
              <div className="space-y-2">
                <Heading level={3}>3. Inline Feedback</Heading>
                <Text variant="body-sm" className="text-muted">
                  Messages contextuels sous les champs de formulaire
                </Text>
              </div>

              <div className="max-w-md p-8 bg-surface-card rounded-xl shadow-inner-stroke border border-border-subtle space-y-6">
                {/* Champ avec feedback success */}
                <div className="space-y-1">
                  <label className="text-body-sm font-semibold" htmlFor="email-demo">Adresse e-mail</label>
                  <input
                    id="email-demo"
                    type="email"
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-3 bg-white border border-border-subtle rounded-md text-body-sm placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 transition-all"
                    onChange={(e) => {
                      if (e.target.value.includes("@")) setFeedbackState("success");
                      else if (e.target.value.length > 3) setFeedbackState("error");
                      else setFeedbackState("idle");
                    }}
                  />
                  <InlineFeedback
                    message="Adresse e-mail valide"
                    variant="success"
                    isVisible={feedbackState === "success"}
                  />
                  <InlineFeedback
                    message="Format d'e-mail invalide"
                    variant="error"
                    isVisible={feedbackState === "error"}
                  />
                  <InlineFeedback
                    message="Nous ne partagerons jamais votre adresse"
                    variant="hint"
                    isVisible={feedbackState === "idle"}
                  />
                </div>

                {/* Bouton submit */}
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => showToast("Formulaire envoyé !", "success", "Merci pour votre inscription.")}
                >
                  <Icon icon={Send} size="sm" className="mr-2" />
                  S&apos;inscrire
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Remplacement du footer par celui du Design Système */}
      <Footer />
    </main>
  );
}
