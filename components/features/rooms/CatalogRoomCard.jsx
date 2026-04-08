import Link from "next/link";

/**
 * Tarjeta de habitación en el catálogo oscuro (`/rooms`).
 */
export default function CatalogRoomCard({ room }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-50">{room.name}</h2>
        <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-100">
          Capacidad: {room.capacity}
        </span>
      </div>

      {room.description ? (
        <p className="text-sm leading-relaxed text-zinc-300">{room.description}</p>
      ) : null}

      <div className="mt-auto">
        <Link
          className="inline-flex w-full justify-center rounded-full bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
          href={`/reservations/new?roomId=${encodeURIComponent(room.id)}`}
        >
          Reservar
        </Link>
      </div>
    </article>
  );
}
