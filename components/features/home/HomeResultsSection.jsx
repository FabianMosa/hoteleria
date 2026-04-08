import Link from "next/link";
import HomeRoomCard from "./HomeRoomCard";

/**
 * Zona de resultados: título, estados de carga/error/vacío y grid de cards.
 */
export default function HomeResultsSection({
  status,
  destination,
  rooms,
  filteredRooms,
  bookingQuery,
}) {
  return (
    <section className="order-1 sm:order-2">
      <header className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">
            {destination
              ? `${destination}: descubre nuestros hoteles`
              : "Descubre nuestros hoteles"}
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            {status === "ready"
              ? `${filteredRooms.length} resultado(s) según tus criterios`
              : status === "loading"
                ? "Cargando habitaciones..."
                : "No fue posible cargar las habitaciones."}
          </p>
        </div>

        <Link
          href="/rooms"
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
        >
          Ver todo
        </Link>
      </header>

      {status === "loading" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-52 rounded-3xl border border-zinc-200 bg-zinc-50 animate-pulse"
            />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            No fue posible cargar las habitaciones. Intenta nuevamente.
          </p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-sm text-zinc-700">
            No encontramos resultados con esos filtros.
            {rooms.length > 0 ? (
              <span className="mt-2 block text-xs text-zinc-500">
                Hay {rooms.length} habitación(es) en catálogo: prueba dejar el destino vacío o
                buscar por palabras del nombre (p. ej. “Suite”, “Doble”).
              </span>
            ) : null}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => {
            const roomId = String(room?.id ?? "");
            const reserveHref = `/reservations/new?roomId=${encodeURIComponent(roomId)}${
              bookingQuery ? `&${bookingQuery}` : ""
            }`;
            return (
              <HomeRoomCard key={roomId} room={room} reserveHref={reserveHref} />
            );
          })}
        </div>
      )}
    </section>
  );
}
