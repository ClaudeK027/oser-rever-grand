# Oser Rêver Grand — Plateforme de Conférence 2026

Une plateforme web premium conçue pour la conférence **Oser Rêver Grand**, un événement majeur dédié à l'inspiration et à l'autonomisation de la jeunesse gabonaise.

## ✨ Caractéristiques

- **Landing Page Éditoriale** : Design haut de gamme utilisant un système de Bento Grid, une typographie luxe et des animations fluides (Framer Motion).
- **Système de Réservation** : Processus d'inscription optimisé et sans distraction.
- **Tableau de Bord Admin** : 
  - Gestion complète des inscrits.
  - Recherche globale et tri multi-colonnes.
  - Édition inline des informations.
  - **Envoi groupé d'invitations** par email.
  - Système de confirmation sécurisé par Modals custom.
- **Ticketing Automatisé** : Génération de billets personnalisés et envoi automatique via Resend avec intégration d'images (Logo CID).
- **Infrastructure Cloud** : Back-end propulsé par Supabase pour une gestion des données en temps réel.

## 🛠️ Stack Technique

- **Framework** : [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Base de données & Auth** : [Supabase](https://supabase.com/)
- **Emails** : [Resend](https://resend.com/)
- **Composants UI** : Design system sur mesure (Aurora backgrounds, Spotlight effects, Bento grids).

## 🚀 Installation & Développement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/ClaudeK027/oser-rever-grand.git
   cd oser-rever-grand
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Variables d'environnement**
   Créez un fichier `.env.local` à la racine et ajoutez vos clés :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
   SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role
   RESEND_API_KEY=votre_clé_resend
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## 🌍 Déploiement

Le projet est configuré pour un déploiement optimal sur **Vercel**. Assurez-vous d'ajouter les variables d'environnement dans les réglages de votre projet Vercel pour activer l'envoi d'emails et l'accès à la base de données.

---
© 2026 Oser Rêver Grand. Tous droits réservés.
