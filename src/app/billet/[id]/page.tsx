"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Download, Loader2, MapPin } from "lucide-react";

/**
 * ═══════════════════════════════════════════════════
 * PAGE — Billet / Ticket (Impression)
 * ═══════════════════════════════════════════════════
 *
 * Design premium du billet de la conférence ORG.
 * Optimisé pour l'impression navigateur (Ctrl+P).
 */

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  status: string;
  transaction_reference: string | null;
  created_at: string;
}

/* ── Numéro de billet formaté ── */
function ticketNumber(id: string): string {
  // Extraire les 6 premiers caractères de l'UUID pour un numéro unique lisible
  const short = id.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `ORG-${short}`;
}

/* ── Date formatée ── */
function formatTicketDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function TicketPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = React.useState<Inscription | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [downloading, setDownloading] = React.useState(false);
  const ticketRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch(`/api/public/billet/${params.id}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setData(result.inscription);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchTicket();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse">
          Chargement du billet...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center">
        <p className="text-red-400 text-sm">{error || "Billet introuvable"}</p>
      </div>
    );
  }

  const qrValue = `ORG-TICKET:${data.id}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&bgcolor=0a0a0a&color=d4a843&format=png`;

  /* ── Télécharger en PDF ── */
  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#faf8f4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Format paysage qui s'adapte au billet
      const pdfWidth = 297; // A4 paysage (mm)
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Billet_ORG_${data.nom}_${data.prenom}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* ── Styles d'impression et mobile ── */}
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .ticket-wrapper { padding: 0 !important; min-height: auto !important; background: white !important; }
          .ticket-card { box-shadow: none !important; border: 2px solid #1a1a1a !important; break-inside: avoid; }
        }

        /* Rotation paysage sur mobile portrait */
        @media (max-width: 768px) {
          .mobile-landscape-container {
            height: 500px; /* Espace pour le billet pivoté */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .ticket-card {
            transform: rotate(90deg);
            width: 768px !important;
            max-width: none !important;
            scale: 0.45;
            flex-shrink: 0;
          }
          @media (max-width: 400px) { .ticket-card { scale: 0.4; } }
          @media (max-width: 350px) { .ticket-card { scale: 0.35; } }
        }
      `}</style>

      <div className="ticket-wrapper min-h-screen bg-night-950 flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
        {/* Download button */}
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="no-print mb-6 px-6 py-2.5 rounded-xl bg-accent text-night-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center gap-2 disabled:opacity-60"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {downloading ? "Génération..." : "Télécharger le billet"}
        </button>

        {/* ═══════════════════════════════════════
            TICKET CARD
            ═══════════════════════════════════════ */}
        <div className="mobile-landscape-container w-full flex items-center justify-center">
          <div ref={ticketRef} className="ticket-card w-full max-w-3xl bg-[#faf8f4] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative">
            
            {/* ── Perforation décorative (côté droit) ── */}
            <div className="absolute right-[88px] top-0 bottom-0 w-0 border-r-2 border-dashed border-black/10 z-10" />

          <div className="flex">
            {/* ── CORPS PRINCIPAL ── */}
            <div className="flex-1 pr-[100px]">
              
              {/* En-tête doré */}
              <div className="bg-gradient-to-r from-[#1a1a1a] via-[#2a2520] to-[#1a1a1a] px-8 py-5 flex items-center gap-4">
                <div className="bg-white p-1.5 rounded-sm flex-shrink-0">
                  <Image
                    src="/assets/logo-mini.png?v=4"
                    alt="ORG"
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4a843]/60 font-bold">
                    Conférence
                  </p>
                  <h1 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide leading-tight">
                    OSER RÊVER GRAND
                  </h1>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl md:text-3xl font-serif font-bold text-[#d4a843] leading-none">
                    30.07
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mt-0.5">
                    Juillet 2026
                  </p>
                </div>
              </div>

              {/* Bande horaire */}
              <div className="bg-[#d4a843] px-8 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60 font-bold">
                    Horaire
                  </span>
                  <span className="text-sm font-bold text-[#1a1a1a] font-mono tracking-wider">
                    16h30 — 18h30
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60 font-bold">
                    Accès
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a] font-bold bg-white/30 px-2 py-0.5 rounded-full">
                    Entrée Libre
                  </span>
                </div>
              </div>

              {/* Lieu */}
              <div className="px-8 py-4 border-b border-black/5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4a843] mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold mb-0.5">
                    Lieu
                  </p>
                  <p className="text-sm font-semibold text-[#1a1a1a]">
                    Centre de Formation et de Perfectionnement Basile Ondimba
                  </p>
                  <p className="text-xs text-black/40 mt-0.5">Libreville, Gabon</p>
                </div>
              </div>

              {/* Informations participant */}
              <div className="px-8 py-5 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold mb-1">
                      Nom
                    </p>
                    <p className="text-base font-serif font-bold text-[#1a1a1a] uppercase tracking-wide">
                      {data.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold mb-1">
                      Prénom(s)
                    </p>
                    <p className="text-base font-serif font-bold text-[#1a1a1a] uppercase tracking-wide">
                      {data.prenom}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold mb-1">
                      Email
                    </p>
                    <p className="text-xs text-black/60 truncate">
                      {data.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold mb-1">
                      Téléphone
                    </p>
                    <p className="text-xs text-black/60 font-mono">
                      {data.telephone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer du billet */}
              <div className="px-8 py-3 bg-[#f0ede6] flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.3em] text-black/25 font-bold italic">
                  Rêver, Oser, Devenir
                </p>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-black/30 font-bold">
                    Billet
                  </p>
                  <p className="text-sm font-mono font-bold text-[#1a1a1a] tracking-wider">
                    {ticketNumber(data.id)}
                  </p>
                </div>
              </div>
            </div>

            {/* ── SOUCHE (côté droit, séparée par la perforation) ── */}
            <div className="w-[88px] bg-[#1a1a1a] flex flex-col items-center justify-between py-5 px-2 flex-shrink-0">
              {/* Texte vertical "DÉCHIRER À L'ENTRÉE" */}
              <p
                className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-bold"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                Déchirer à l'entrée
              </p>

              {/* QR Code */}
              <div className="bg-white rounded-lg p-1.5">
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={64}
                  height={64}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Numéro vertical */}
              <p
                className="text-[8px] font-mono text-[#d4a843]/60 font-bold"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {ticketNumber(data.id)}
              </p>
            </div>
          </div>
        </div>

        {/* Infos supplémentaires (non imprimées) */}
        <div className="no-print mt-6 text-center space-y-1">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            Inscrit le {formatTicketDate(data.created_at)} · Réf. :{" "}
            {data.transaction_reference || "—"}
          </p>
          <p className="text-white/10 text-[9px] uppercase tracking-widest">
            Statut : {data.status}
          </p>
        </div>
      </div>
    </>
  );
}
