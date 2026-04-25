"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heading, Text, Button, Icon } from "@/components/ui";
import {
  Search,
  LogOut,
  Users,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  Save,
  Pencil,
  Ticket,
  Trash2,
  Send,
} from "lucide-react";
import { EASE_PREMIUM } from "@/lib/animations";
import { useToast, Toast } from "@/components/ui/toast";
import { ConfirmModal } from "@/components/ui";

/**
 * ═══════════════════════════════════════════════════
 * PAGE — Admin Dashboard
 * ═══════════════════════════════════════════════════
 *
 * Tableau de bord des inscriptions avec recherche
 * globale, tri par colonnes et édition inline.
 */

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  status: string;
  transaction_reference: string | null;
  montant: number | null;
  created_at: string;
  updated_at: string;
}

type SortKey = "created_at" | "nom" | "prenom" | "status";
type SortDir = "asc" | "desc";

const STATUS_OPTIONS = ["enregistré", "payée", "envoyée"];

/* ── Statut Badge ── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    enregistré: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    payée: "bg-green-500/10 text-green-400 border-green-500/20",
    envoyée: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        styles[status] || "bg-white/5 text-white/40 border-white/10"
      }`}
    >
      {status}
    </span>
  );
}

/* ── Formatage date ── */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Champ éditable ── */
function EditField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-10 bg-night-950/80 border border-white/10 rounded-lg px-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { toast, show, hide } = useToast();
  const [inscriptions, setInscriptions] = React.useState<Inscription[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("created_at");
  const [sortDir, setSortDir] = React.useState<SortDir>("desc");

  // État d'édition
  const [editing, setEditing] = React.useState<Inscription | null>(null);
  const [editData, setEditData] = React.useState<Partial<Inscription>>({});
  const [saving, setSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [sendingId, setSendingId] = React.useState<string | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [sendingBulk, setSendingBulk] = React.useState(false);

  // État du Modal de confirmation
  const [confirmModal, setConfirmModal] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant: "danger" | "info";
    confirmText: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    variant: "info",
    confirmText: "Confirmer"
  });

  /* ── Sélection ── */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === sorted.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sorted.map((i) => i.id)));
    }
  };

  /* ── Récupérer les inscriptions ── */
  const fetchInscriptions = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedIds(new Set()); // Reset selection on refresh
    try {
      const response = await fetch("/api/admin/inscriptions");

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Erreur de chargement");

      setInscriptions(result.inscriptions || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    fetchInscriptions();
  }, [fetchInscriptions]);

  /* ── Déconnexion ── */
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  /* ── Ouvrir l'édition ── */
  const openEdit = (item: Inscription) => {
    setEditing(item);
    setEditData({
      nom: item.nom,
      prenom: item.prenom,
      email: item.email,
      telephone: item.telephone,
      status: item.status,
      transaction_reference: item.transaction_reference || "",
    });
    setSaveSuccess(false);
  };

  /* ── Sauvegarder les modifications ── */
  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/admin/inscriptions/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...editData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      // Mettre à jour localement
      setInscriptions((prev) =>
        prev.map((i) =>
          i.id === editing.id ? { ...i, ...editData } as Inscription : i
        )
      );
      setSaveSuccess(true);
      setTimeout(() => {
        setEditing(null);
        setSaveSuccess(false);
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ── Supprimer une inscription ── */
  const askDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Supprimer l'inscription ?",
      message: "Cette action est irréversible. L'inscrit sera définitivement retiré de la base de données.",
      variant: "danger",
      confirmText: "Supprimer",
      onConfirm: () => {
        handleDelete(id);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/inscriptions/${id}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de la suppression");

      // Mettre à jour localement
      setInscriptions((prev) => prev.filter((i) => i.id !== id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      show("Inscription supprimée", "success");
    } catch (err: any) {
      show(err.message || "Erreur lors de la suppression", "error");
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Envoyer le billet par email ── */
  const handleSendTicket = async (id: string) => {
    setSendingId(id);
    try {
      const response = await fetch("/api/admin/inscriptions/send-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de l'envoi");

      // Mettre à jour localement le statut
      setInscriptions((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "envoyée" } : i))
      );
      
      show("Billet envoyé avec succès !", "success");
    } catch (err: any) {
      show(err.message || "Erreur lors de l'envoi", "error");
    } finally {
      setSendingId(null);
    }
  };

  /* ── Envoyer à la sélection ── */
  const askBulkSend = () => {
    if (selectedIds.size === 0) return;
    setConfirmModal({
      isOpen: true,
      title: "Envoi groupé",
      message: `Voulez-vous envoyer l'invitation à ${selectedIds.size} inscrits ?`,
      variant: "info",
      confirmText: "Envoyer tout",
      onConfirm: () => {
        handleBulkSend();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkSend = async () => {
    setSendingBulk(true);
    let successCount = 0;
    let failCount = 0;

    const idsToProcess = Array.from(selectedIds);
    
    for (const id of idsToProcess) {
      try {
        const response = await fetch("/api/admin/inscriptions/send-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          successCount++;
          // Update local state for each success
          setInscriptions((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status: "envoyée" } : i))
          );
        } else {
          failCount++;
        }
      } catch (e) {
        failCount++;
      }
    }

    setSendingBulk(false);
    setSelectedIds(new Set());

    if (failCount === 0) {
      show(`${successCount} billets envoyés avec succès !`, "success");
    } else {
      show(`${successCount} envoyés, ${failCount} échecs.`, successCount > 0 ? "info" : "error");
    }
  };

  /* ── Recherche ── */
  const filtered = React.useMemo(() => {
    if (!search.trim()) return inscriptions;
    const q = search.toLowerCase().trim();
    return inscriptions.filter(
      (i) =>
        i.nom?.toLowerCase().includes(q) ||
        i.prenom?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.telephone?.toLowerCase().includes(q) ||
        i.transaction_reference?.toLowerCase().includes(q)
    );
  }, [inscriptions, search]);

  /* ── Tri ── */
  const sorted = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      let valA = (a as any)[sortKey] ?? "";
      let valB = (b as any)[sortKey] ?? "";

      if (sortKey === "created_at") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  /* ── Toggle Tri ── */
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column)
      return <ChevronDown className="w-3 h-3 text-white/20 ml-1" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-accent ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 text-accent ml-1" />
    );
  };

  return (
    <main className="min-h-screen bg-night-950 text-white">
      {/* ── Header Bar ── */}
      <header className="sticky top-0 z-50 bg-night-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-sm">
              <Image
                src="/assets/logo-mini.png?v=4"
                alt="ORG Logo"
                width={24}
                height={24}
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <Heading
                level={4}
                className="text-white text-sm md:text-base leading-none"
              >
                Espace Admin
              </Heading>
              <Text
                variant="caption"
                className="text-accent/50 text-[9px] uppercase tracking-widest"
              >
                Oser Rêver Grand
              </Text>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 text-[11px] font-medium uppercase tracking-wider"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats + Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <Heading level={2} className="text-white text-xl md:text-2xl mb-1">
              Inscriptions
            </Heading>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent/60" />
              <Text variant="body-sm" className="text-white/50 text-[13px]">
                {inscriptions.length} inscription
                {inscriptions.length !== 1 ? "s" : ""} au total
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {selectedIds.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={askBulkSend}
                  disabled={sendingBulk}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all duration-200 text-[11px] font-medium uppercase tracking-wider disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${sendingBulk ? "animate-spin" : ""}`} />
                  Envoyer à la sélection ({selectedIds.size})
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={fetchInscriptions}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all duration-200 text-[11px] font-medium uppercase tracking-wider disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Actualiser
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom, email, téléphone ou référence..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 bg-night-900/60 border border-white/10 rounded-xl pl-11 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
          />
        </div>

        {error && (
          <div className="bg-red-400/5 border border-red-400/10 rounded-xl p-4 mb-6">
            <Text variant="body-sm" className="text-red-400">
              {error}
            </Text>
          </div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="bg-night-900/30 border border-white/5 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={sorted.length > 0 && selectedIds.size === sorted.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-white/10 bg-night-950 text-accent focus:ring-accent/20 transition-all cursor-pointer"
                    />
                  </th>
                  {[
                    { key: "created_at" as SortKey, label: "Date" },
                    { key: "nom" as SortKey, label: "Nom" },
                    { key: "prenom" as SortKey, label: "Prénom" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 cursor-pointer hover:text-white/60 transition-colors select-none"
                    >
                      <span className="flex items-center">
                        {label}
                        <SortIcon column={key} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Contact
                  </th>
                  <th className="px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Référence
                  </th>
                  <th
                    onClick={() => handleSort("status")}
                    className="px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 cursor-pointer hover:text-white/60 transition-colors select-none"
                  >
                    <span className="flex items-center">
                      Statut
                      <SortIcon column="status" />
                    </span>
                  </th>
                  <th className="px-4 md:px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-accent/40 animate-spin" />
                        <Text variant="body-sm" className="text-white/30">
                          Chargement des inscriptions...
                        </Text>
                      </div>
                    </td>
                  </tr>
                ) : sorted.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-6 h-6 text-white/10" />
                        <Text variant="body-sm" className="text-white/30">
                          {search
                            ? "Aucun résultat pour cette recherche."
                            : "Aucune inscription pour le moment."}
                        </Text>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sorted.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${
                        selectedIds.has(item.id) ? "bg-accent/5" : index % 2 === 0 ? "" : "bg-white/[0.01]"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="w-4 h-4 rounded border-white/10 bg-night-950 text-accent focus:ring-accent/20 transition-all cursor-pointer"
                        />
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <Text
                          variant="caption"
                          className="text-white/50 text-[11px] font-mono"
                        >
                          {formatDate(item.created_at)}
                        </Text>
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <span className="text-white font-medium text-sm">
                          {item.nom}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <span className="text-white/80 text-sm">
                          {item.prenom}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <div className="space-y-0.5">
                          <div className="text-white/60 text-[12px] truncate max-w-[200px]">
                            {item.email}
                          </div>
                          <div className="text-white/40 text-[11px] font-mono">
                            {item.telephone}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <span className="text-accent/80 text-[12px] font-mono">
                          {item.transaction_reference || "—"}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 md:px-6 py-3.5">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openEdit(item)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 text-[10px] font-medium uppercase tracking-wider"
                          >
                            <Pencil className="w-3 h-3" />
                            <span className="hidden md:inline">Modifier</span>
                          </button>
                          <a
                            href={`/billet/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/5 border border-accent/20 text-accent/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-200 text-[10px] font-medium uppercase tracking-wider"
                          >
                            <Ticket className="w-3 h-3" />
                            <span className="hidden md:inline">Billet</span>
                          </a>
                          <button
                            onClick={() => askDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200 text-[10px] font-medium uppercase tracking-wider disabled:opacity-50"
                          >
                            {deletingId === item.id ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                            <span className="hidden md:inline">Supprimer</span>
                          </button>
                          <button
                            onClick={() => handleSendTicket(item.id)}
                            disabled={sendingId === item.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/5 border border-blue-500/20 text-blue-400/60 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200 text-[10px] font-medium uppercase tracking-wider disabled:opacity-50"
                          >
                            {sendingId === item.id ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Send className="w-3 h-3" />
                            )}
                            <span className="hidden md:inline">
                              {item.status === "envoyée" ? "Renvoyer" : "Envoyer"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer du tableau */}
          {!loading && sorted.length > 0 && (
            <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
              <Text
                variant="caption"
                className="text-white/30 text-[10px]"
              >
                {sorted.length} résultat{sorted.length !== 1 ? "s" : ""}
                {search && ` pour "${search}"`}
                {selectedIds.size > 0 && ` — ${selectedIds.size} sélectionné(s)`}
              </Text>
              <Text
                variant="caption"
                className="text-white/20 text-[9px] uppercase tracking-widest"
              >
                Trié par{" "}
                {sortKey === "created_at"
                  ? "date"
                  : sortKey === "nom"
                    ? "nom"
                    : sortKey === "prenom"
                      ? "prénom"
                      : "statut"}{" "}
                ({sortDir === "asc" ? "croissant" : "décroissant"})
              </Text>
            </div>
          )}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          PANNEAU D'ÉDITION (Slide-over)
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {editing && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !saving && setEditing(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE_PREMIUM }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-night-900 border-l border-white/10 shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div>
                  <Heading
                    level={4}
                    className="text-white text-sm leading-none"
                  >
                    Modifier l'inscription
                  </Heading>
                  <Text
                    variant="caption"
                    className="text-white/30 text-[9px] uppercase tracking-widest mt-1"
                  >
                    ID : {editing.id.slice(0, 8)}...
                  </Text>
                </div>
                <button
                  onClick={() => !saving && setEditing(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <EditField
                    label="Prénom"
                    value={editData.prenom || ""}
                    onChange={(v) =>
                      setEditData({ ...editData, prenom: v })
                    }
                    disabled={saving}
                  />
                  <EditField
                    label="Nom"
                    value={editData.nom || ""}
                    onChange={(v) =>
                      setEditData({ ...editData, nom: v })
                    }
                    disabled={saving}
                  />
                </div>

                <EditField
                  label="Email"
                  value={editData.email || ""}
                  onChange={(v) =>
                    setEditData({ ...editData, email: v })
                  }
                  type="email"
                  disabled={saving}
                />

                <EditField
                  label="Téléphone"
                  value={editData.telephone || ""}
                  onChange={(v) =>
                    setEditData({ ...editData, telephone: v })
                  }
                  type="tel"
                  disabled={saving}
                />

                <EditField
                  label="Référence Transaction"
                  value={editData.transaction_reference || ""}
                  onChange={(v) =>
                    setEditData({
                      ...editData,
                      transaction_reference: v,
                    })
                  }
                  disabled={saving}
                />

                {/* Statut — Select */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Statut
                  </label>
                  <select
                    value={editData.status || "enregistré"}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                    disabled={saving}
                    className="w-full h-10 bg-night-950/80 border border-white/10 rounded-lg px-3 text-white text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50 appearance-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-night-950">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Métadonnées (lecture seule) */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <Text
                    variant="caption"
                    className="text-white/20 text-[9px] uppercase tracking-widest"
                  >
                    Métadonnées
                  </Text>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-white/30">Créé le</span>
                    <span className="text-white/50 font-mono">
                      {formatDate(editing.created_at)}
                    </span>
                    <span className="text-white/30">Modifié le</span>
                    <span className="text-white/50 font-mono">
                      {formatDate(editing.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer — Save */}
              <div className="px-6 py-4 border-t border-white/5">
                {saveSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center gap-2 text-green-400 text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Modifications enregistrées
                  </motion.div>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full h-12 rounded-lg bg-accent text-night-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-400 transition-all duration-200 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toast {...toast} onClose={hide} />
      
      <ConfirmModal
        {...confirmModal}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
}
