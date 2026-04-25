import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

/* ── PATCH : Modifier une inscription ── */
export async function PATCH(request: Request) {
  // Vérifier l'authentification
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const token = tokenMatch?.[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Session expirée" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID de l'inscription requis" },
        { status: 400 }
      );
    }

    // Champs autorisés à la modification
    const allowedFields = [
      "nom",
      "prenom",
      "email",
      "telephone",
      "status",
      "transaction_reference",
      "montant",
    ];

    const sanitizedUpdates: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in updates) {
        sanitizedUpdates[key] = updates[key];
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return NextResponse.json(
        { error: "Aucun champ valide à modifier" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("inscriptions")
      .update(sanitizedUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inscription: data });
  } catch (err: any) {
    console.error("API update error:", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
