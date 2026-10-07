import HomeExplorer from "./HomeExplorer";

/**
 * Hero: capas suaves, titular y buscador (composición para `app/page.js`).
 */
export default function HomeHeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden pb-16 pt-32 lg:pt-40">
      {/* Background Image & Premium Overlays */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-out hover:scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-c6a4d2759ad3?q=80&w=2000&auto=format&fit=crop")' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand/50 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/60 via-brand/10 to-background" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Antofagasta, Chile
        </p>
        <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Tu estadía, con la calma <br className="hidden sm:block" /> de un buen hotel
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-stone-200 sm:text-lg opacity-0 animate-fade-in-up animate-delay-100">
          Elige fechas, refina por tipo de habitación y reserva en minutos. Sin registros:
          solo tus datos de contacto para la confirmación.
        </p>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 mt-12 sm:px-6 lg:px-8 opacity-0 animate-fade-in-up animate-delay-200">
        <div className="rounded-2xl p-2 sm:p-3 glass-panel shadow-2xl">
          <HomeExplorer />
        </div>
      </div>
    </section>
  );
}
