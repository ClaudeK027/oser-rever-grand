"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavItem } from "./navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { cn } from "@/lib/utils";

/**
 * ═══════════════════════════════════════════════════
 * CONDITIONAL NAVBAR — Logic Layer
 * ═══════════════════════════════════════════════════
 *
 * Ce composant gère l'affichage de la Navbar, du ScrollProgress
 * et du padding associé en fonction de la route actuelle.
 *
 * - "/"            → navbar overlay sur hero (pas de pt)
 * - "/reservation" → masquée (focus mode conversion)
 * - autres         → pt-nav-compact pour garantir l'offset
 */

export function ConditionalNavbar({
  items,
  children,
}: {
  items: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noNavbarRoutes = ["/reservation"];
  const isNoNavbar = noNavbarRoutes.includes(pathname) || pathname.startsWith("/admin") || pathname.startsWith("/billet");
  const isHeroOverlay = pathname === "/";

  return (
    <div
      className={cn(
        "relative min-h-screen flex flex-col",
        !isNoNavbar && !isHeroOverlay && "pt-nav-compact"
      )}
    >
      {!isNoNavbar && (
        <>
          <Navbar items={items} />
          <ScrollProgress />
        </>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
