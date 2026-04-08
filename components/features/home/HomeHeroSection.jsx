import HomeExplorer from "./HomeExplorer";

/**
 * Bloque hero del home: fondo, breadcrumbs locales y titular.
 * Separado de `app/page.js` para mantener la ruta como solo composición.
 */
export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Tu próximo destino
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
              Antofagasta: habitaciones disponibles
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
              Busca disponibilidad, filtra por capacidad y crea tu reserva en
              pocos pasos.
            </p>
          </div>

          <HomeExplorer />
        </div>
      </div>
    </section>
  );
}
