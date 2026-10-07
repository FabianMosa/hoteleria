import RoomsList from "@/components/features/rooms/RoomsList";

export default function RoomsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Catálogo
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
            Habitaciones
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-hotel sm:text-lg">
            Cada opción incluye capacidad y descripción. Elige la tuya y completa la
            reserva con tus datos de contacto.
          </p>
        </header>

        <RoomsList />
      </div>
    </div>
  );
}
