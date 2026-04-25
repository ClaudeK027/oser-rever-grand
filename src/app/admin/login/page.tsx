"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heading,
  Text,
  Button,
  Input,
  Spotlight,
  Icon,
} from "@/components/ui";
import { Lock, LogIn } from "lucide-react";
import {
  staggerContainer,
  staggerChild,
  defaultViewport,
} from "@/lib/animations";

/**
 * ═══════════════════════════════════════════════════
 * PAGE — Admin Login
 * ═══════════════════════════════════════════════════
 *
 * Page d'authentification pour l'espace admin ORG.
 * Design cohérent avec la page réservation.
 */

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur de connexion");
      }

      // Rediriger vers le dashboard admin
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-night-950 text-white relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <Spotlight className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent/10 scale-150" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={defaultViewport}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          variants={staggerChild}
          className="bg-night-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Top glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="bg-white p-1.5 rounded-sm shadow-sm mb-4 inline-block">
              <Image
                src="/assets/logo-mini.png?v=4"
                alt="ORG Logo"
                width={34}
                height={34}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-accent/60" />
              <Text
                variant="caption"
                className="text-accent/60 uppercase tracking-[0.2em] text-[9px] font-bold"
              >
                Espace Admin
              </Text>
            </div>
            <Heading level={2} className="text-display-sm mb-1 text-white">
              Connexion
            </Heading>
            <Text variant="body-sm" className="text-white/50 text-[13px]">
              Accédez au tableau de bord des inscriptions.
            </Text>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-night-950/50"
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-night-950/50"
            />

            {error && (
              <Text
                variant="caption"
                className="text-red-400 text-center block bg-red-400/5 py-2 rounded-lg border border-red-400/10"
              >
                {error}
              </Text>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-12 text-md"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
                {!loading && (
                  <Icon
                    icon={LogIn}
                    size="sm"
                    className="ml-2 text-night-950"
                  />
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Text
              variant="caption"
              className="text-white/20 text-[8px] uppercase tracking-widest"
            >
              Oser Rêver Grand — Administration
            </Text>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
