import RoomsList from "./RoomsList";

export default function RoomsPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-50">
            Habitaciones
          </h1>
          <p className="mt-2 text-zinc-200 max-w-2xl">
            Selecciona una habitación y reserva en pocos pasos.
          </p>
        </header>

        <RoomsList />
      </div>
    </div>
  );
}

