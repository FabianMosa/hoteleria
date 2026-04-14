import RoomsList from "@/components/features/rooms/RoomsList";

export default function RoomsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Catálogo
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Habitaciones
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-hotel sm:text-base">
            Cada opción incluye capacidad y descripción. Elige la tuya y completa la
            reserva con tus datos de contacto.
          </p>
        </header>

        <RoomsList />
      </div>
    </div>
  );
}
