import Link from "next/link";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

/**
 * Cabecera global del landing claro (`/`).
 * Layout compartido; copy enlaces según producto (`@content` / `@ux`).
 */
export default function SiteHeader() {
  const portfolioDemo = isPortfolioDemo();

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-950 text-white">
            H
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Hotelería</p>
            <p className="text-xs text-zinc-500">
              {portfolioDemo ? "Demo portafolio (solo lectura)" : "MVP de reservas"}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href="/rooms"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Habitaciones
          </Link>
          {portfolioDemo ? (
            <span className="inline-flex max-w-[11rem] items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs font-medium text-amber-900 sm:max-w-none sm:px-4 sm:text-sm">
              Sin datos de prueba
            </span>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
