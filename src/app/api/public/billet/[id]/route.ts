import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // L'ID UUID sert de token sécurisé (difficile à deviner)
  const { data, error } = await supabaseAdmin
    .from("inscriptions")
    .select("id, nom, prenom, email, telephone, status, transaction_reference, created_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Billet introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json({ inscription: data });
}
