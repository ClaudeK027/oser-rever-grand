"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heading, 
  Text, 
  Button, 
  Input, 
  Spotlight, 
  Icon 
} from "@/components/ui";
import { ArrowLeft, Send, CheckCircle2, ArrowRight, Copy, Check } from "lucide-react";
import { staggerContainer, staggerChild, defaultViewport, EASE_PREMIUM } from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * PAGE — Réservation (Flux en 3 étapes)
 * ═══════════════════════════════════════════════════
 * 
 * Étape 1 : Formulaire d'informations personnelles
 * Étape 2 : Instructions de paiement Airtel Money + saisie référence
 * Étape 3 : Confirmation de l'inscription
 */

const AIRTEL_MONEY_NUMBER = "+241 76 23 30 85";
const AIRTEL_MONEY_RAW = "0076233085";
const MONTANT = "3 000 FCFA";

type Step = "info" | "payment" | "success";

/* ── Helpers téléphone gabonais ── */
function formatGabonPhone(raw: string): string {
  // Supprime tout sauf les chiffres et le +
  let digits = raw.replace(/[^\d]/g, "");
  
  // Si commence par 241, on le retire pour recomposer
  if (digits.startsWith("241")) digits = digits.slice(3);
  // Si commence par 0 (format local), on le retire
  if (digits.startsWith("0")) digits = digits.slice(1);
  
  // Formate : +241 XX XX XX XX
  if (digits.length === 0) return "+241 ";
  if (digits.length <= 2) return `+241 ${digits}`;
  if (digits.length <= 4) return `+241 ${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 6) return `+241 ${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
  return `+241 ${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)}`;
}

function displayPhone(raw: string): string {
  if (!raw) return "";
  return formatGabonPhone(raw);
}

export default function ReservationPage() {
  const [step, setStep] = React.useState<Step>("info");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const [formData, setFormData] = React.useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "+241 ",
    transaction_reference: "",
  });

  /* ── Gestion intelligente du champ téléphone ── */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Si l'utilisateur efface tout, on garde le préfixe
    if (input.length < 5) {
      setFormData({ ...formData, telephone: "+241 " });
      return;
    }
    
    setFormData({ ...formData, telephone: formatGabonPhone(input) });
  };

  /* ── Étape 1 → 2 : Valider les infos, passer au paiement ── */
  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  /* ── Étape 2 → 3 : Enregistrer en base via API Route ── */
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur réseau");
      }

      setStep("success");
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Copier le numéro Airtel Money ── */
  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText("+24176233085");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencieux
    }
  };

  /* ── Indicateur d'étape ── */
  const stepIndex = step === "info" ? 0 : step === "payment" ? 1 : 2;
  const canSubmitPayment = formData.transaction_reference.trim().length > 0;

  return (
    <main className="min-h-screen bg-night-950 text-white relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background Ornaments */}
      <Spotlight className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent/10 scale-150" />
      
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Link href="/" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300">
          <Icon icon={ArrowLeft} size="sm" variant="white" className="group-hover:-translate-x-1 transition-transform opacity-60" />
          <Text variant="caption" className="uppercase tracking-[0.2em] text-[10px]">Retour</Text>
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={defaultViewport}
        className="w-full max-w-lg relative z-10"
      >
        {/* Registration Card */}
        <motion.div 
          variants={staggerChild}
          className="bg-night-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top glow border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {/* Header — compact */}
          <div className="flex flex-col items-center mb-5 text-center">
             <div className="bg-white p-1.5 rounded-sm shadow-sm mb-3 inline-block">
                <Image 
                  src="/assets/logo-mini.png?v=4" 
                  alt="ORG Logo" 
                  width={28} 
                  height={28} 
                  className="object-contain"
                  unoptimized
                />
             </div>
             <Heading level={3} className="text-xl md:text-2xl mb-0.5 text-white">
               {step === "info" && "Réservez votre place"}
               {step === "payment" && "Finalisez le paiement"}
               {step === "success" && "C'est enregistré !"}
             </Heading>
             <Text variant="body-sm" className="text-white/50 text-[13px]">
               {step === "info" && "Renseignez vos informations pour commencer."}
               {step === "payment" && `Envoyez ${MONTANT} via Airtel Money puis validez.`}
               {step === "success" && "Votre inscription a bien été enregistrée."}
             </Text>
          </div>

          {/* ── Step Indicator ── */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-2 mb-5">
              {["Infos", "Paiement"].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && (
                    <div className={`h-px w-8 transition-colors duration-500 ${i <= stepIndex ? "bg-accent/60" : "bg-white/10"}`} />
                  )}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                      i < stepIndex 
                        ? "bg-accent text-night-950" 
                        : i === stepIndex 
                          ? "bg-accent/20 text-accent border border-accent/40" 
                          : "bg-white/5 text-white/30 border border-white/10"
                    }`}>
                      {i < stepIndex ? <Check className="w-3 h-3 text-night-950" /> : i + 1}
                    </div>
                    <span className={`text-[9px] font-sans font-medium uppercase tracking-[0.12em] transition-colors duration-500 ${
                      i <= stepIndex ? "text-accent" : "text-white/30"
                    }`}>
                      {label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP CONTENT (Animated transitions)
              ══════════════════════════════════════════ */}
          <AnimatePresence mode="wait">
            {/* ── ÉTAPE 1 : Informations personnelles ── */}
            {step === "info" && (
              <motion.form
                key="step-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                onSubmit={handleInfoSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input 
                    label="Prénom *" 
                    placeholder="Ex: Jean" 
                    required
                    value={formData.prenom || ""}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="bg-night-950/50"
                  />
                  <Input 
                    label="Nom *" 
                    placeholder="Ex: Kouka" 
                    required
                    value={formData.nom || ""}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="bg-night-950/50"
                  />
                </div>
                
                <Input 
                  label="Email (optionnel)" 
                  type="email" 
                  placeholder="votre@email.com" 
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-night-950/50"
                />
                
                <Input 
                  label="Téléphone *" 
                  type="tel" 
                  placeholder="+241 XX XX XX XX" 
                  required
                  value={formData.telephone || ""}
                  onChange={handlePhoneChange}
                  className="bg-night-950/50"
                />

                <div className="pt-1">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full h-12 text-md"
                  >
                    Continuer <Icon icon={ArrowRight} size="sm" className="ml-2 text-night-950" />
                  </Button>
                </div>
              </motion.form>
            )}

            {/* ── ÉTAPE 2 : Paiement Airtel Money ── */}
            {step === "payment" && (
              <motion.form
                key="step-payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                onSubmit={handlePaymentSubmit}
                className="space-y-4"
              >
                {/* Récapitulatif — TRÈS VISIBLE */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                      <span className="font-serif italic text-xl text-white">
                        {formData.prenom} {formData.nom}
                      </span>
                    </div>
                    <div className="text-sm text-white/80 font-mono pl-3.5 tracking-wide">
                      {displayPhone(formData.telephone)}
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => setStep("info")}
                    className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-night-950 transition-all duration-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(234,179,8,0.2)]"
                  >
                    <span>Modifier</span>
                    <Icon icon={ArrowLeft} size="sm" variant="white" className="group-hover:text-night-950 transition-colors" />
                  </button>
                </div>

                {/* Instructions de paiement — COMPACT */}
                <div className="bg-accent/5 border border-accent/15 rounded-xl p-4">
                  <Text variant="body-sm" className="text-white/80 leading-relaxed text-[13px]">
                    Envoyez <span className="text-accent font-bold">{MONTANT}</span> via <span className="font-bold text-white">Airtel Money</span> au :
                  </Text>
                  
                  {/* Numéro avec bouton copier */}
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="w-full flex items-center justify-between bg-night-950/80 border border-accent/30 rounded-lg px-4 py-2.5 mt-3 group hover:border-accent/50 transition-all duration-300"
                  >
                    <span className="font-mono text-lg md:text-xl font-bold text-accent tracking-wider">
                      {AIRTEL_MONEY_NUMBER}
                    </span>
                    <span className="flex items-center gap-1 text-white/40 group-hover:text-accent transition-colors">
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-white" />
                      )}
                      <span className="text-[9px] uppercase tracking-widest font-bold">
                        {copied ? "Copié !" : "Copier"}
                      </span>
                    </span>
                  </button>
                </div>

                {/* ═══ CHAMP RÉFÉRENCE — TRÈS VISIBLE ═══ */}
                <div className="bg-accent/10 border-2 border-accent/40 rounded-xl p-4 space-y-2">
                  <label className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                      Référence de la transaction *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: MP250425.1234.A56789"
                    required
                    value={formData.transaction_reference || ""}
                    onChange={(e) => setFormData({ ...formData, transaction_reference: e.target.value })}
                    disabled={loading}
                    className="w-full h-12 bg-night-950/80 border border-accent/30 rounded-lg px-4 text-white text-base font-mono placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
                  />
                  <p className="text-white/40 text-[10px] font-sans leading-relaxed">
                    Ce numéro se trouve dans le SMS de confirmation Airtel Money reçu après votre paiement.
                  </p>
                </div>

                {error && (
                  <Text variant="caption" className="text-red-400 text-center block bg-red-400/5 py-2 rounded-lg border border-red-400/10">
                    {error}
                  </Text>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full h-12 text-md"
                  disabled={loading || !canSubmitPayment}
                >
                  {loading ? "Traitement..." : "Valider mon inscription"} 
                  {!loading && <Icon icon={Send} size="sm" className="ml-2 text-night-950" />}
                </Button>
              </motion.form>
            )}

            {/* ── ÉTAPE 3 : Confirmation ── */}
            {step === "success" && (
              <motion.div 
                key="step-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="text-accent w-8 h-8" />
                </div>
                <Heading level={3} className="text-white mb-2">Inscription confirmée !</Heading>
                <Text variant="body-sm" className="text-white/60 mb-4 max-w-[34ch]">
                  Vous recevrez une confirmation et votre <span className="text-white font-semibold">billet par e-mail</span> après vérification de votre paiement.
                </Text>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6">
                  <Text variant="caption" className="text-white/40 block mb-1">Besoin d'aide ?</Text>
                  <Text variant="body-sm" className="text-accent font-medium">
                    Contactez le +241 76 23 30 85
                  </Text>
                </div>

                <Text variant="caption" className="text-white/30 mb-8 text-[10px] uppercase tracking-widest block">
                  Réf. Transaction : {formData.transaction_reference}
                </Text>
                <Link href="/">
                  <Button variant="outline" className="border-accent/20 text-accent hover:bg-accent/10">
                    Retour à l'accueil
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimers */}
          <div className="mt-4 text-center">
            <Text variant="caption" className="text-white/30 text-[8px] leading-relaxed uppercase tracking-widest">
              En validant, vous acceptez nos conditions de vente & confidentialité.
            </Text>
          </div>
        </motion.div>

        {/* Floating Brand Elements (Subtle) */}
        <div className="mt-4 text-center opacity-30">
           <Text variant="caption" className="tracking-[0.4em] uppercase text-[9px]">ORG © 2026</Text>
        </div>
      </motion.div>
    </main>
  );
}
