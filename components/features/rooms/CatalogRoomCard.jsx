import Link from "next/link";

/**
 * Tarjeta de habitación en el catálogo (`/rooms`), tema claro.
 */
export default function CatalogRoomCard({ room }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-950">{room.name}</h2>
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
          Capacidad: {room.capacity}
        </span>
      </div>

      {room.description ? (
        <p className="text-sm leading-relaxed text-zinc-600">{room.description}</p>
      ) : null}

      <div className="mt-auto">
        <Link
          className="inline-flex w-full justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          href={`/reservations/new?roomId=${encodeURIComponent(room.id)}`}
        >
          Reservar
        </Link>
      </div>
    </article>
  );
}
