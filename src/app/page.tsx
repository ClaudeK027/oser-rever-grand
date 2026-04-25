"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { VisionCard } from "@/components/ui/vision-card";
import { Heading, Text, SectionTitle } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ui/profile-card";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Sparkles,
  Target,
  Zap,
  Lightbulb,
  Waves,
  ArrowRight,
  ShieldCheck,
  Star,
  Camera,
  Users,
  Calendar,
  Mic,
  Flag,
  Heart,
  Timer
} from "lucide-react";
import {
  staggerContainer,
  staggerChild,
  defaultViewport,
  DURATION,
  EASE_PREMIUM
} from "@/lib/animations";
import { StatCard } from "@/components/ui/stat-card";
import { MediaPlaceholder } from "@/components/ui/skeleton";
import { Footer } from "@/components/layout/footer";
import { BioDrawer } from "@/components/ui/bio-drawer";
import { intervenants, equipe } from "@/data/mock";

export default function LandingPage() {
  const [selectedMember, setSelectedMember] = React.useState<any>(null);
  return (
    <main className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO MONUMENTAL (Aurora)
          ═══════════════════════════════════════ */}
      <section id="evenement" className="relative">
        <HeroSection
          layout="centered"
          overline="ÉDITION EXCLUSIVE"
          bgImage="/assets/hero-bg.png"
          title={
            <span className="text-white">
              Oser Rêver{" "}
              <span
                className="italic font-serif bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FFD033 0%, #EAB308 40%, #FFE799 70%, #EAB308 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  paddingRight: "0.3em",
                  marginRight: "-0.05em",
                }}
              >
                Grand
              </span>
            </span>
          }
          subtitle="Inspirer la jeunesse gabonaise à croire en son potentiel, adopter une vision ambitieuse et transformer ses rêves en actions concrètes pour le Gabon."
          primaryCta={{ label: "Prendre ma place", onClick: () => window.location.href = "/reservation" }}
          secondaryCta={{ label: "Découvrir le programme", onClick: () => window.location.href = "#programme" }}
          meta="Libreville · 2026"
          scrollTargetId="impact"
          auroraIntensity="medium"
          className="bg-night-950 text-white"
        />
      </section>

      {/* ═══════════════════════════════════════
          SECTION IMPACT — Stats (respiration)
          ═══════════════════════════════════════ */}
      <section
        id="impact"
        className="relative bg-night-950 dark-section text-white border-t border-white/5 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="container-editorial py-16 md:py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            <motion.div variants={staggerChild} className="text-center md:text-left">
              <StatCard
                valeur="21"
                label="ans"
                description="Âge médian. Un potentiel énorme pour le pays."
                className="p-0 items-center md:items-start text-center md:text-left"
              />
            </motion.div>
            <motion.div variants={staggerChild} className="text-center md:text-left">
              <StatCard
                valeur="70"
                label="%"
                description="De la population a moins de 35 ans. Moteur futur."
                className="p-0 items-center md:items-start text-center md:text-left"
              />
            </motion.div>
            <motion.div variants={staggerChild} className="text-center md:text-left">
              <StatCard
                valeur="1"
                label="édition"
                description="Libreville · 2026. Prenez part au point de départ."
                className="p-0 items-center md:items-start text-center md:text-left"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — PRÉSENTATION (L'ÉVÉNEMENT)
          Editorial Magazine — chapter header + dropcap + pull-quote + framed visual
          ═══════════════════════════════════════ */}
      <section id="evenement" className="section-padding bg-background relative overflow-hidden">
        {/* Halo doré diffus (ambiance) */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-accent/[0.06] blur-[140px] pointer-events-none"
        />

        <div className="container-editorial relative">
          {/* Chapter marker — resserré sur 2 lignes typographiques */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 lg:mb-14 flex items-center gap-3"
          >
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              №&nbsp;01
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
              L'Événement
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 xl:gap-x-20 gap-y-14 items-start">
            {/* ─────────── Colonne Texte (cols 1-7) ─────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="lg:col-span-7 space-y-9"
            >
              {/* Title — structure 2 lignes explicite */}
              <motion.div variants={staggerChild} className="space-y-5">
                <Heading
                  level={2}
                  className="font-serif leading-[1.02] tracking-[-0.02em]"
                >
                  <span className="block text-[clamp(2rem,3.8vw,3rem)] text-foreground">
                    C'est quoi
                  </span>
                  <span className="block italic text-[clamp(2.25rem,4.4vw,3.75rem)] text-foreground">
                    Oser Rêver Grand
                    <span className="not-italic text-accent">&nbsp;?</span>
                  </span>
                </Heading>
                <Text className="font-serif italic text-lg md:text-xl text-muted leading-snug">
                  Une impulsion pour une génération d'audacieux.
                </Text>
              </motion.div>

              {/* Séparateur doré plus marqué */}
              <motion.div
                variants={staggerChild}
                aria-hidden="true"
                className="flex items-center gap-2"
              >
                <span className="h-[2px] w-10 bg-accent" />
                <span className="h-px w-20 bg-accent/30" />
              </motion.div>

              {/* Lead paragraph — dropcap compact, leading aligné au x-height */}
              <motion.div variants={staggerChild}>
                <p className="text-body-lg leading-[1.7] text-foreground/85">
                  <span
                    className="float-left font-serif italic text-accent mr-3 select-none"
                    style={{ fontSize: "3rem", lineHeight: "1", marginTop: "0.04em" }}
                    aria-hidden="true"
                  >
                    L
                  </span>
                  <span className="sr-only">L</span>a conférence{" "}
                  <span className="font-semibold italic text-accent font-serif">
                    « Oser Rêver Grand »
                  </span>{" "}
                  vise à inspirer les jeunes gabonais à{" "}
                  <span className="italic font-serif text-accent">croire en leur potentiel</span>,
                  adopter une vision ambitieuse et transformer leurs rêves en{" "}
                  <span className="italic font-serif text-accent">actions concrètes</span>.
                </p>
              </motion.div>

              {/* Pull-quote — gold bar */}
              <motion.blockquote
                variants={staggerChild}
                className="relative pl-6 py-1 clear-both"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-accent via-accent/60 to-accent/10"
                />
                <Text className="font-serif italic text-xl md:text-[1.625rem] text-foreground leading-[1.35]">
                  La jeunesse est le{" "}
                  <span className="text-accent">moteur essentiel</span>{" "}
                  du développement de notre pays.
                </Text>
              </motion.blockquote>

              {/* Second paragraph */}
              <motion.div variants={staggerChild}>
                <Text variant="body-md" muted className="leading-relaxed max-w-[58ch]">
                  Malgré les défis du monde actuel, cet événement est le point de départ d'une{" "}
                  <span className="italic font-serif text-accent">métamorphose collective</span>.
                </Text>
              </motion.div>

              {/* CTA — seul, ancré visuellement */}
              <motion.div variants={staggerChild} className="pt-2">
                <Button variant="outline" size="lg" magnetEffect className="group">
                  Notre philosophie
                  <Icon
                    icon={ArrowRight}
                    size="sm"
                    className="ml-2 transition-transform duration-medium group-hover:translate-x-1"
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* ─────────── Colonne Visuel (cols 8-12, sticky) ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-5 relative lg:sticky lg:top-28 self-start"
            >
              <Spotlight className="-top-24 -right-16 bg-accent/8" />

              {/* Corner brackets — signature éditoriale */}
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-accent/50 pointer-events-none z-10"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-accent/50 pointer-events-none z-10"
              />

              {/* Frame visuel */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-gradient-to-br from-cream-50 via-white to-cream-100 shadow-elevation-2 border border-accent/10">
                {/* Label top-left */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/85 backdrop-blur-xs border border-black/5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-night-950/75">
                    Libreville · 2026
                  </span>
                </div>

                {/* Edition tag top-right */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="font-serif italic text-white/80 text-sm">№ 01</span>
                </div>

                {/* Grille subtile */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Image manifeste */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/manifeste/vision-audace.jpg"
                    alt="Vision Oser Rêver Grand"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                  />
                  {/* Overlay subtile pour la lisibilité des textes blancs */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Bas du cadre — signature "Oser Rêver Grand" dans le cadre */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
                  <span className="font-serif italic text-white/90 text-sm">
                    Oser Rêver Grand
                  </span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
                    Édition 2026
                  </span>
                </div>
              </div>

              {/* Caption sous le cadre — meta signature */}
              <div className="mt-6 space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {["Conférence", "1ʳᵉ édition", "Libreville", "2026"].map((tag, i) => (
                    <React.Fragment key={tag}>
                      {i > 0 && (
                        <span aria-hidden="true" className="text-accent/40 text-[10px]">·</span>
                      )}
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-text">
                        {tag}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-accent/15">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-serif italic text-accent text-xl leading-none select-none">
                      §
                    </span>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-muted truncate">
                      Manifeste visuel
                    </span>
                  </div>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/75 flex-shrink-0">
                    Chap. 01
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — LE CONCEPT (VISION, MISSION, HISTOIRE)
          ═══════════════════════════════════════ */}
      <div id="concept">
        {/* SUB-SECTION 3.1: NOTRE VISION */}
        <section id="vision" className="section-padding bg-night-950 dark-section text-white relative overflow-hidden">
          {/* Abstract Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent blur-[120px] rounded-full" />
          </div>

          <div className="container-editorial relative z-10 space-y-16">
            <SectionTitle
              align="center"
              overline="NOTRE VISION"
              title="Trois piliers pour bâtir demain"
              subtitle="Notre approche repose sur des fondations solides pour un impact durable."
              className="text-white"
            />

            <BentoGrid>
              {/* Inspiration - Grand bloc */}
              <BentoGridItem
                title="Inspiration et Motivation"
                description="Partager des histoires de réussite pour montrer que tout est possible avec audace et détermination. Encourager chaque jeune à dépasser ses limites."
                header={
                  <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden rounded-t-xl group">
                    <Image
                      src="/images/concept/vision-inspiration.jpg"
                      alt="Inspiration et Motivation"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-60" />
                  </div>
                }
                className="col-span-4 lg:col-span-12 h-auto"
                icon={<Zap size={24} />}
              />

              {/* Engagement - Split bloc */}
              <VisionCard
                titre="Engagement & Impact"
                points={[
                  "Acteurs de changement locaux",
                  "Futurs leaders du Gabon",
                  "Réseau de jeunes motivés"
                ]}
                accentColor="gold"
                className="col-span-4 lg:col-span-6 bg-night-900 border-white/5"
              />

              {/* Innovation - Split bloc avec Visuel */}
              <BentoGridItem
                title="Innovation & Entrepreneuriat"
                description="Levier de transformation économique. Proposer des idées nouvelles pour résoudre les problèmes locaux."
                header={
                  <div className="relative w-full h-full min-h-[320px] overflow-hidden rounded-t-xl group">
                    <Image
                      src="/images/concept/vision-innovation.jpg"
                      alt="Innovation & Entrepreneuriat"
                      fill
                      className="object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-60" />
                  </div>
                }
                className="col-span-4 lg:col-span-6 bg-night-900 border-white/5"
                icon={<Star size={24} />}
              />
            </BentoGrid>
          </div>
        </section>

        {/* SUB-SECTION 3.2: NOTRE MISSION */}
        <section id="mission" className="section-padding bg-background border-y border-border-subtle">
          <div className="container-editorial space-y-16">
            <SectionTitle
              align="center"
              overline="NOTRE MISSION"
              title="Accompagner la jeunesse gabonaise"
              subtitle="Nous bâtissons des ponts entre le rêve et la réalité concrète."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-stretch max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm flex flex-col justify-center">
                <Text variant="body-lg" className="text-night-800 leading-relaxed font-serif italic">
                  "Notre mission est d’inspirer et d’accompagner la jeunesse gabonaise à travers des conférences, des témoignages et des échanges, afin de les aider à développer une vision ambitieuse."
                </Text>
              </div>
              <div className="p-8 rounded-2xl bg-night-950 text-night-200 border border-white/5 shadow-xl flex flex-col justify-between">
                <Text variant="body-sm" className="leading-relaxed opacity-80 font-sans">
                  Nous ambitionnons de devenir un acteur répondant aux besoins réels à travers la mise en place de dispositifs de financement et d’accompagnement sur mesure.
                </Text>
                <div className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center">
                    <Icon icon={Waves} size="sm" variant="accent" />
                  </div>
                  <Text variant="caption" className="font-semibold uppercase tracking-widest text-accent">Expertise & Financement</Text>
                </div>
              </div>
            </div>

            {/* Grande Image de Mission (Placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              className="max-w-5xl mx-auto w-full pt-8"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-elevation-2 group">
                <Image
                  src="/images/concept/mission-impact.jpg"
                  alt="Impact de notre mission"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SUB-SECTION 3.3: NOTRE HISTOIRE */}
        <section id="histoire" className="section-padding bg-cream-50 relative overflow-hidden">
          <div className="container-editorial space-y-16">
            <SectionTitle
              align="center"
              overline="L'ORIGINE"
              title="Une histoire née d’un constat"
              subtitle="Le Gabon regorge de talents qui n’attendent qu’un déclic."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Colonne Visuel (Skeleton) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={defaultViewport}
                className="order-2 lg:order-1"
              >
                <div className="relative aspect-[4/3] lg:aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
                  <Image
                    src="/images/concept/histoire-origine.jpg"
                    alt="L'origine de Oser Rêver Grand"
                    fill
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Text variant="caption" className="text-white font-semibold tracking-[0.2em] uppercase">L'étincelle de départ</Text>
                  </div>
                </div>
              </motion.div>

              {/* Colonne Texte */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="space-y-6 order-1 lg:order-2"
              >
                <Text variant="body-md" muted className="leading-relaxed">
                  "OSER RÊVER GRAND" est né d’un triste constat : la jeunesse gabonaise a du mal à trouver sa place sur le continent africain, malgré un <span className="italic font-serif text-accent">potentiel immense</span> et des idées formidables.
                </Text>
                <Text variant="body-md" muted className="leading-relaxed">
                  Le plus difficile reste souvent de se lancer et de <span className="font-semibold italic font-serif text-accent">croire en soi</span>. Il était essentiel de permettre à cette jeunesse d’écouter des personnalités inspirantes pour envisager un <span className="italic font-serif text-accent">avenir ambitieux</span>.
                </Text>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════
          SECTION 4 — INTERVENANTS 2026 (GALA DARK)
          ═══════════════════════════════════════ */}
      <section id="intervenants" className="section-padding bg-night-950 dark-section relative overflow-hidden">
        {/* Floating gradient ornaments */}
        <Spotlight className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent/5 scale-150" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="container-editorial relative z-10 space-y-20">
          <SectionTitle
            align="center"
            overline="NOS SPEAKERS"
            title="Intervenants d'exception"
            subtitle="Des leaders et entrepreneurs inspirants qui partagent leur parcours pour éclairer le vôtre."
            className="text-white"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto"
          >
            {intervenants.map((intervenant) => (
              <ProfileCard
                key={intervenant.id}
                name={`${intervenant.prenom} ${intervenant.nom}`.toUpperCase()}
                role={intervenant.role.toUpperCase()}
                description={intervenant.description}
                image={intervenant.image}
                linkedinUrl={intervenant.socials?.linkedin}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] xl:w-[calc(25%-2rem)] min-w-[280px] glow-border"
              />
            ))}


          </motion.div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          SECTION 5 — L'EXPÉRIENCE (PROGRAMME & MOMENTS FORTS)
          ═══════════════════════════════════════ */}
      <section id="programme" className="section-padding bg-background relative overflow-hidden">
        <div className="container-editorial relative z-10 space-y-32">
          {/* Main Title for both sub-sections */}
          <SectionTitle
            align="center"
            overline="AU CŒUR DE L'ÉVÉNEMENT"
            title="L'Expérience Oser Rêver Grand"
            subtitle="Découvrez le déroulé de cette journée d'exception ainsi que les temps forts qui marqueront cette édition 2026."
            className="mb-16"
          />

          <div className="space-y-32">
            {/* ═════ Sous-section A : Le Programme — chronologique ═════ */}
            <div className="space-y-12 relative">
              {/* Chapter marker éditorial */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                  №&nbsp;02
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                  Le Programme
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-accent/25 to-transparent" />
              </div>

              <BentoGrid className="mt-8">
                <BentoGridItem editorial className="col-span-full py-16 md:py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    className="flex flex-col items-center w-full"
                  >
                    <motion.div 
                      variants={staggerChild}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-8 shadow-glow-accent"
                    >
                      <Icon icon={Sparkles} size="lg" className="animate-pulse-soft" />
                    </motion.div>
                    
                    <motion.div variants={staggerChild} className="w-full">
                      <Heading level={3} className="font-serif text-3xl md:text-5xl text-foreground tracking-tight mb-4">
                        Dévoilement prochain du <span className="italic text-accent">programme</span>.
                      </Heading>
                    </motion.div>
                    
                    <motion.div variants={staggerChild} className="w-full">
                      <Text variant="body-lg" className="text-muted leading-relaxed max-w-xl mx-auto mb-10">
                        Restez à l'écoute pour découvrir les thématiques, les panels et les masterclasses qui marqueront cette édition.
                      </Text>
                    </motion.div>
                    
                    <motion.div variants={staggerChild}>
                      <Link href="/reservation">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="shadow-glow-accent group rounded-full px-8" 
                        >
                          M'inscrire pour être informé
                          <Icon icon={ArrowRight} size="sm" className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </BentoGridItem>
              </BentoGrid>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — L'ÉQUIPE (FONDATIONS HUMAINES)
          ═══════════════════════════════════════ */}
      <section id="equipe" className="section-padding bg-night-950 dark-section relative">
        {/* Background Decorations (Clipped) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <Spotlight className="bottom-0 right-0 bg-accent/5" />
        </div>

        <div className="container-editorial relative z-10 space-y-20">
          <SectionTitle
            align="center"
            overline="CEUX QUI PORTENT LA VISION"
            title="L'Équipe Oser Rêver Grand"
            subtitle="Une équipe passionnée et déterminée à accompagner la jeunesse gabonaise vers de nouveaux sommets."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-6xl mx-auto"
          >
            {equipe.map((membre, index) => {
              const align = index % 4 === 0 ? "left" : index % 4 === 3 ? "right" : "center";
              return (
                <ProfileCard
                  key={membre.id}
                  variant="team"
                  name={`${membre.prenom} ${membre.nom}`}
                  role={membre.titre}
                  image={membre.image}
                  bio={membre.bio}
                  linkedinUrl={membre.socials?.linkedin}
                  bubbleAlign={align}
                  onBioClick={() => setSelectedMember({
                    name: `${membre.prenom} ${membre.nom}`,
                    role: membre.titre,
                    bio: membre.bio,
                    image: membre.image,
                    linkedinUrl: membre.socials?.linkedin
                  })}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION FINALE — APPEL À L'ACTION
          ═══════════════════════════════════════ */}
      <section className="bg-night-950 py-32 dark-section relative overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-editorial relative z-10 text-center space-y-12">
          <Heading level={2} className="text-display-md text-white">
            Prêt à changer de dimension ?
          </Heading>
          <Text variant="body-lg" className="text-night-300 max-w-xl mx-auto">
            Les places sont limitées. Rejoignez l'élite de demain et transformez votre vision en réalité.
          </Text>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button
              variant="primary"
              size="lg"
              magnetEffect
              onClick={() => window.location.href = "/reservation"}
            >
              Réserver mon pass <Icon icon={ArrowRight} size="sm" className="ml-2" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:text-accent"
              onClick={() => window.location.href = "#programme"}
            >
              Consulter le programme détaillé
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <BioDrawer
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </main>
  );
}
