import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { Resend } from "resend";
import { getTicketEmailHtml } from "@/lib/email-templates";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

// Numéro de billet formaté (identique à la page ticket)
function formatTicketNumber(id: string): string {
  const short = id.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `ORG-${short}`;
}

export async function POST(request: Request) {
  // 1. Vérifier l'authentification admin
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const token = tokenMatch?.[1];

  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const adminUser = await verifyToken(token);
  if (!adminUser) {
    return NextResponse.json({ error: "Session expirée" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    // 2. Récupérer les infos de l'inscrit
    const { data: inscription, error: fetchError } = await supabaseAdmin
      .from("inscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !inscription) {
      return NextResponse.json({ error: "Inscrit introuvable" }, { status: 404 });
    }

    // 3. Préparer l'URL du billet
    const origin = request.headers.get("origin") || "https://oser-rever-grand.com";
    const ticketUrl = `${origin}/billet/${id}`;

    const logoUrl = `cid:logo-mini`;
    const logoPath = path.join(process.cwd(), "public/assets/logo-mini.png");
    let logoBuffer: Buffer | null = null;
    
    try {
      logoBuffer = fs.readFileSync(logoPath);
    } catch (e) {
      console.warn("Impossible de lire le logo pour l'email:", e);
    }

    const attachments: any[] = logoBuffer ? [
      {
        filename: "logo-mini.png",
        content: logoBuffer,
        content_id: 'logo-mini',
        disposition: 'inline'
      }
    ] : [];

    // 4. Envoyer l'email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'ORG <conference@oser-rever-grand.com>',
      to: [inscription.email],
      subject: '🎫 Votre billet pour Oser Rêver Grand 2026',
      html: getTicketEmailHtml({
        prenom: inscription.prenom,
        nom: inscription.nom,
        ticketUrl: ticketUrl,
        ticketNumber: formatTicketNumber(inscription.id),
        logoUrl: logoUrl
      }),
      attachments: attachments
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
    }

    // 5. Mettre à jour le statut dans la base de données
    const { error: updateError } = await supabaseAdmin
      .from("inscriptions")
      .update({ status: "envoyée" })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Billet envoyé avec succès !" 
    });

  } catch (err: any) {
    console.error("Send ticket error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du processus." },
      { status: 500 }
    );
  }
}
