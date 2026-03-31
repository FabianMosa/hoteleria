import Link from "next/link";
import HomeExplorer from "./ui/HomeExplorer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-950">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Logo simple (MVP): evita dependencias y assets por ahora */}
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-950 text-white">
              H
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Hotelería</p>
              <p className="text-xs text-zinc-500">MVP de reservas</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/rooms"
              className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Habitaciones
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero + buscador (inspirado en el layout de la captura) */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Fondo “foto-like” sin usar assets externos: gradiente + ruido sutil */}
            <div className="h-full w-full bg-gradient-to-b from-sky-100 via-sky-50 to-white" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 15%, #000 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-zinc-200">
                  Hoteles
                </span>
                <span>/</span>
                <span>Chile</span>
                <span>/</span>
                <span className="font-medium text-zinc-700">Antofagasta</span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Tu próximo destino
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Antofagasta: reserva tu hotel
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                  Busca disponibilidad, filtra por capacidad y crea tu reserva
                  en pocos pasos.
                </p>
              </div>

              <HomeExplorer />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
