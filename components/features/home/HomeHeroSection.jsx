import HomeExplorer from "./HomeExplorer";

/**
 * Hero: capas suaves, titular y buscador (composición para `app/page.js`).
 */
export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-brand-soft/40 via-background to-background" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-brand-soft/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 22% 12%, #0d9488 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Antofagasta
            </p>
            <span
              className="mt-3 block h-0.5 w-10 rounded-full bg-brand/90"
              aria-hidden
            />
            <h1 className="mt-5 text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
              Tu estadía, con la calma de un buen hotel
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-hotel sm:text-[1.05rem] sm:leading-relaxed">
              Elige fechas, refina por tipo de habitación y reserva en minutos. Sin registros:
              solo tus datos de contacto para la confirmación.
            </p>
          </div>

          <HomeExplorer />
        </div>
      </div>
    </section>
  );
}
