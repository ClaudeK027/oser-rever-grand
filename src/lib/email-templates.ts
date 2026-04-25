import React from 'react';

/**
 * ═══════════════════════════════════════════════════
 * TEMPLATE EMAIL — Billet
 * ═══════════════════════════════════════════════════
 * 
 * Note : Ce fichier exporte une fonction qui génère le HTML
 * pour assurer une compatibilité maximale avec les clients mail.
 */

export function getTicketEmailHtml(data: {
  prenom: string;
  nom: string;
  ticketUrl: string;
  ticketNumber: string;
  logoUrl: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Votre billet Oser Rêver Grand</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333; }
        .header { padding: 40px 20px; text-align: center; border-bottom: 1px solid #222; }
        .content { padding: 40px 30px; text-align: center; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background-color: #0a0a0a; }
        h1 { font-size: 24px; color: #d4a843; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        p { line-height: 1.6; color: #cccccc; margin-bottom: 20px; }
        .ticket-box { 
          background-color: #1a1a1a; 
          border: 1px solid #d4a843; 
          padding: 25px; 
          margin: 30px 0; 
          text-align: left;
          position: relative;
        }
        .ticket-info { margin-bottom: 15px; }
        .label { font-size: 10px; text-transform: uppercase; color: #d4a843; letter-spacing: 1px; font-weight: bold; }
        .value { font-size: 16px; color: #ffffff; font-weight: bold; }
        .btn { 
          display: inline-block; 
          background-color: #d4a843; 
          color: #0a0a0a; 
          padding: 15px 35px; 
          text-decoration: none; 
          border-radius: 4px; 
          font-weight: bold; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          margin-top: 20px;
        }
        .divider { height: 1px; background-color: #333; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${data.logoUrl}" alt="ORG Logo" width="60" style="margin-bottom: 15px;">
          <h1>Oser Rêver Grand</h1>
          <div style="font-size: 12px; color: #d4a843; letter-spacing: 4px; text-transform: uppercase;">Conférence 2026</div>
        </div>

        <div class="content">
          <p style="font-size: 18px; color: #ffffff;">Bonjour ${data.prenom},</p>
          <p>Félicitations ! Votre inscription à la conférence <strong>Oser Rêver Grand</strong> a été confirmée. Nous sommes impatients de vous accueillir.</p>
          
          <div class="ticket-box">
            <div class="ticket-info">
              <div class="label">Participant</div>
              <div class="value">${data.prenom} ${data.nom}</div>
            </div>
            <div class="ticket-info">
              <div class="label">Date & Heure</div>
              <div class="value">30 Juillet 2026 — 16h30</div>
            </div>
            <div class="ticket-info">
              <div class="label">Lieu</div>
              <div class="value">Centre de Formation Basile Ondimba</div>
            </div>
            <div class="divider"></div>
            <div class="ticket-info" style="margin-bottom: 0;">
              <div class="label">Numéro de Billet</div>
              <div class="value" style="font-family: monospace;">${data.ticketNumber}</div>
            </div>
          </div>

          <p>Vous pouvez accéder à votre billet officiel et l'imprimer en cliquant sur le bouton ci-dessous :</p>
          
          <a href="${data.ticketUrl}" class="btn">Accéder à mon billet</a>

          <p style="margin-top: 40px; font-size: 13px; color: #555;">
            Si vous avez des questions, n'hésitez pas à nous contacter au +241 76 23 30 85.
          </p>
        </div>

        <div class="footer">
          &copy; 2026 Oser Rêver Grand. Tous droits réservés.<br>
          Libreville, Gabon
        </div>
      </div>
    </body>
    </html>
  `;
}
