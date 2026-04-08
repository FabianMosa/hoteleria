import Link from "next/link";

/**
 * Pie global del sitio: enlaces rápidos y copy legal mínimo.
 * Misma línea visual que `SiteHeader` (zinc claro, mobile-first).
 */
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-zinc-950">Hotelería</p>
          <p className="text-xs text-zinc-500">
            MVP de reservas — Antofagasta, Chile.
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
          aria-label="Pie de página"
        >
          <Link
            href="/"
            className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          >
            Inicio
          </Link>
          <Link
            href="/rooms"
            className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          >
            Habitaciones
          </Link>
          <Link
            href="/login"
            className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
          >
            Iniciar sesión
          </Link>
        </nav>

        <p className="text-xs text-zinc-400 sm:text-right">
          © {new Date().getFullYear()} Hotelería. Demo.
        </p>
      </div>
    </footer>
  );
}
