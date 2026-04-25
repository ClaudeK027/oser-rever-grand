import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Utilisation de supabaseAdmin (service_role) pour contourner les règles RLS (Row Level Security)
    // Cela permet de faire un Upsert public sans ouvrir les droits UPDATE à tout le monde.
    const { data, error } = await supabaseAdmin
      .from("inscriptions")
      .upsert(
        {
          prenom: body.prenom,
          nom: body.nom,
          email: body.email,
          telephone: body.telephone,
          transaction_reference: body.transaction_reference,
          status: "enregistré",
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase Admin Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
