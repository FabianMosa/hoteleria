import Link from "next/link";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";
import RoomCoverImage from "./RoomCoverImage";

/**
 * Tarjeta de habitación en el catálogo (`/rooms`), tema claro.
 */
export default function CatalogRoomCard({ room }) {
  const portfolioDemo = isPortfolioDemo();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <RoomCoverImage
        imageUrl={room.imageUrl}
        alt={`Foto de ${room.name}`}
        aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-zinc-950">{room.name}</h2>
          <span className="inline-flex shrink-0 items-center rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            Capacidad: {room.capacity}
          </span>
        </div>

        {room.description ? (
          <p className="text-sm leading-relaxed text-zinc-600">{room.description}</p>
        ) : null}

        <div className="mt-auto">
          {portfolioDemo ? (
            <span className="inline-flex w-full cursor-not-allowed justify-center rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-500">
              Solo visualización (demo)
            </span>
          ) : (
            <Link
              className="inline-flex w-full justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              href={`/reservations/new?roomId=${encodeURIComponent(room.id)}`}
            >
              Reservar
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
