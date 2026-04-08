import Link from "next/link";

/**
 * Tarjeta de habitación en el grid claro del home.
 */
export default function HomeRoomCard({ room, reserveHref }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-28 bg-gradient-to-br from-zinc-100 via-white to-sky-100" />
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-zinc-950">
            {room?.name ?? "Habitación"}
          </h3>
          <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            Cap. {room?.capacity ?? "-"}
          </span>
        </div>

        {room?.description ? (
          <p className="line-clamp-2 text-sm text-zinc-600">{room.description}</p>
        ) : (
          <p className="text-sm text-zinc-600">Ideal para tu próxima estadía.</p>
        )}

        <div className="mt-1 grid gap-2">
          <Link
            href={reserveHref}
            className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Reservar
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
