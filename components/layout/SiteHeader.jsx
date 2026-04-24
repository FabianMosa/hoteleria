"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

/**
 * Cabecera fija: marca, estado de ruta en enlaces y CTA según modo portafolio (sin login).
 */
export default function SiteHeader() {
  const portfolioDemo = isPortfolioDemo();
  const pathname = usePathname() ?? "";
  const isRooms = pathname === "/rooms";
  const isHome = pathname === "/";
  const isReservations = pathname.startsWith("/reservations");

  return (
    <header className="sticky top-0 z-40 border-b border-border-hotel/80 bg-surface/80 shadow-[0_1px_0_rgb(28_25_23_/4%)] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-xl outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-sm font-bold text-white shadow-md ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-[1.03]"
            aria-hidden
          >
            H
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">
              Hotelería
            </p>
          </div>
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2"
          aria-label="Principal"
        >
          <Link
            href="/"
            className={`hotel-link-nav hidden sm:inline-flex ${isHome ? "hotel-link-nav-active" : ""}`}
          >
            Inicio
          </Link>
          <Link
            href="/rooms"
            className={`hotel-link-nav hidden sm:inline-flex ${isRooms ? "hotel-link-nav-active" : ""}`}
          >
            Habitaciones
          </Link>
          {/* En modo portafolio el envío sigue bloqueado en API; el CTA lleva al formulario en vista previa. */}
          <Link
            href="/rooms"
            className={`hotel-link-nav inline-flex sm:hidden ${isRooms ? "hotel-link-nav-active" : ""}`}
          >
            Catálogo
          </Link>
          <Link
            href="/reservations/new"
            className={`hotel-btn-primary px-4 sm:ml-1 sm:px-5 ${isReservations ? "ring-2 ring-brand-soft ring-offset-2 ring-offset-surface" : ""}`}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
