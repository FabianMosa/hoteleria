import RoomsList from "@/components/features/rooms/RoomsList";

export default function RoomsPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Habitaciones
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Selecciona una habitación y reserva en pocos pasos.
          </p>
        </header>

        <RoomsList />
      </div>
    </div>
  );
}

