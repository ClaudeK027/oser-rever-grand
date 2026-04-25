import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oser Rêver Grand — Conférence 2026 | Inspirer la Jeunesse Gabonaise",
  description:
    "La conférence \"Oser Rêver Grand\" vise à inspirer les jeunes gabonais à croire en leur potentiel, adopter une vision ambitieuse et transformer leurs rêves en actions concrètes.",
  keywords: [
    "Oser Rêver Grand",
    "conférence Gabon",
    "jeunesse gabonaise",
    "entrepreneuriat Gabon",
    "inspiration",
    "2026",
  ],
  openGraph: {
    title: "Oser Rêver Grand — Conférence 2026",
    description:
      "Inspirer la jeunesse gabonaise à transformer ses rêves en actions concrètes.",
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: "/assets/logo-mini.png",
    shortcut: "/assets/logo-mini.png",
    apple: "/assets/logo-mini.png",
  },
};

import { ConditionalNavbar } from "@/components/layout/conditional-navbar";

const navigationItems = [
  { label: "L'Événement", href: "/#evenement" },
  { label: "Le Concept", href: "/#concept" },
  { label: "Les Intervenants", href: "/#intervenants" },
  { label: "Le Programme", href: "/#programme" },
  { label: "L'Équipe", href: "/#equipe" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <ConditionalNavbar items={navigationItems}>
          {children}
        </ConditionalNavbar>
      </body>
    </html>
  );
}
