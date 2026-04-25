"use client";

import React from "react";
import Image from "next/image";
import { Loader2, Users, Mail, Phone, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  status: string;
  created_at: string;
}

const GUESTS_PER_PAGE = 25;

export default function GuestListPage() {
  const [guests, setGuests] = React.useState<Inscription[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [downloading, setDownloading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const pagesRef = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch("/api/admin/inscriptions");
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);

        const filtered = (result.inscriptions || []).filter(
          (i: Inscription) => i.status === "envoyée"
        );

        const sorted = filtered.sort((a: Inscription, b: Inscription) => {
          const nameCompare = a.nom.localeCompare(b.nom);
          if (nameCompare !== 0) return nameCompare;
          return a.prenom.localeCompare(b.prenom);
        });

        setGuests(sorted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
  }, []);

  // Découper les invités en pages
  const pages: (Inscription | null)[][] = [];
  const totalRows = Math.max(guests.length, 1); // Au moins 1 ligne pour avoir une page même vide
  for (let i = 0; i < totalRows; i += GUESTS_PER_PAGE) {
    const pageGuests: (Inscription | null)[] = [];
    for (let j = i; j < i + GUESTS_PER_PAGE && j < guests.length; j++) {
      pageGuests.push(guests[j]);
    }
    pages.push(pageGuests);
  }
  const totalPages = Math.max(1, pages.length);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    // Attendre que React affiche toutes les pages (retrait de la classe 'hidden')
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < pagesRef.current.length; i++) {
        const pageEl = pagesRef.current[i];
        if (!pageEl) continue;

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      }

      pdf.save("Liste_Invites_ORG_2026.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8 text-center">
        <p className="text-red-500 font-serif text-xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .a4-page { break-after: page; display: flex !important; }
        }
        .a4-page {
          width: 210mm;
          height: 297mm;
          padding: 15mm 20mm;
          background: white;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin: 0 auto 32px auto;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        @media print {
          .a4-page {
            box-shadow: none;
            margin: 0 auto;
          }
        }
        .guest-list-table {
          width: 100%;
          border-collapse: collapse;
        }
        .guest-list-table th {
          border-bottom: 2px solid #1a1a1a;
          padding: 6px 6px;
          text-align: left;
          font-family: var(--font-serif);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 8px;
          color: #1a1a1a;
        }
        .guest-list-table td {
          border-bottom: 1px solid #f0f0f0;
          padding: 5px 6px;
          font-size: 9px;
          color: #333;
          line-height: 1.3;
        }
        .guest-list-table tr:nth-child(even) {
          background-color: #fcfbf8;
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 pb-32">
        {pages.map((pageGuests, pageIndex) => (
          <div
            key={pageIndex}
            ref={(el) => { pagesRef.current[pageIndex] = el; }}
            className="a4-page"
            style={!downloading && pageIndex !== currentPage ? { display: 'none' } : undefined}
          >
            {/* ===== HEADER ===== */}
            <header className="flex items-end justify-between border-b-4 border-accent pb-4 mb-4 flex-shrink-0">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/logo.png"
                  alt="ORG"
                  width={100}
                  height={44}
                  className="object-contain"
                  unoptimized
                />
                <div>
                  <h1 className="text-2xl font-serif font-bold text-night-950 tracking-tight leading-none mb-1">
                    LISTE DES INVITÉS
                  </h1>
                  <p className="text-accent font-bold uppercase tracking-[0.3em] text-[8px]">
                    Oser Rêver Grand — Édition 2026
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-night-950/40 font-bold text-[8px] uppercase tracking-widest mb-0.5">
                  <Calendar className="w-2.5 h-2.5" />
                  {new Date().toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-accent font-serif font-bold text-sm">
                  {guests.length} Confirmés
                </div>
              </div>
            </header>

            {/* ===== BODY (TABLE) ===== */}
            <div className="flex-1">
              <table className="guest-list-table">
                <thead>
                  <tr>
                    <th className="w-[30px]">#</th>
                    <th>Nom & Prénom</th>
                    <th>Coordonnées</th>
                    <th>Signature / Note</th>
                  </tr>
                </thead>
                <tbody>
                  {pageGuests.map((guest, index) => {
                    const globalIndex = pageIndex * GUESTS_PER_PAGE + index;
                    return (
                      <tr key={guest?.id || `empty-${globalIndex}`}>
                        <td className="font-mono text-night-950/30 text-[8px]">
                          {(globalIndex + 1).toString().padStart(3, "0")}
                        </td>
                        <td>
                          {guest ? (
                            <>
                              <span className="font-serif font-bold text-night-950 uppercase tracking-wide text-[10px]">
                                {guest.nom}
                              </span>{" "}
                              <span className="text-accent font-medium uppercase tracking-widest text-[7px]">
                                {guest.prenom}
                              </span>
                            </>
                          ) : (
                            <span className="inline-block h-4" />
                          )}
                        </td>
                        <td>
                          {guest && (
                            <div className="flex flex-col gap-0">
                              <div className="flex items-center gap-1">
                                <Phone className="w-2 h-2 text-night-950/20 flex-shrink-0" />
                                <span className="font-mono text-[8px]">
                                  {guest.telephone}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-night-950/40 italic text-[8px]">
                                <Mail className="w-2 h-2 flex-shrink-0" />
                                <span className="truncate max-w-[140px]">
                                  {guest.email}
                                </span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="w-[100px]">
                          <div className="h-4 border-b border-dashed border-black/10" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ===== FOOTER ===== */}
            <footer className="pt-4 border-t border-night-950/5 flex justify-between items-center text-[8px] uppercase tracking-[0.3em] flex-shrink-0">
              <p className="opacity-30 italic">Oser Rêver Grand · Libreville 2026</p>
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-[11px] text-night-950/80">
                  <span className="text-accent">PAGE {pageIndex + 1}</span> / {totalPages}
                </p>
                <p className="opacity-30 italic text-[7px]">{guests.length} entrées totales</p>
              </div>
              <p className="opacity-30 italic">Document confidentiel</p>
            </footer>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!downloading && totalPages > 1 && (
        <div className="no-print fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-night-950 p-2 rounded-full shadow-2xl z-50">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 text-white hover:text-accent disabled:opacity-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-white text-xs font-bold px-2">
            Page {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 text-white hover:text-accent disabled:opacity-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Floating Actions */}
      <div className="no-print fixed bottom-8 right-8 flex flex-col gap-4">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="bg-accent text-night-950 p-4 rounded-full shadow-2xl hover:scale-110 transition-all group relative disabled:opacity-50"
        >
          {downloading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Download className="w-6 h-6" />
          )}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-night-950 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {downloading ? "Génération..." : "Télécharger en PDF"}
          </span>
        </button>

        <button
          onClick={() => window.print()}
          className="bg-night-950 text-white p-4 rounded-full shadow-2xl hover:bg-accent hover:text-night-950 transition-all group relative"
        >
          <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-night-950 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Imprimer la liste
          </span>
        </button>
      </div>
    </>
  );
}
