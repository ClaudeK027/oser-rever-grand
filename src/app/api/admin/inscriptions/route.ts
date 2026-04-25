import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function GET(request: Request) {
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

  // Récupérer toutes les inscriptions, triées par date
  const { data, error } = await supabaseAdmin
    .from("inscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inscriptions: data });
}
