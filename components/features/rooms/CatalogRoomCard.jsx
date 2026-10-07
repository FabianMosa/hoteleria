import Link from "next/link";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";
import RoomCoverImage from "./RoomCoverImage";

/**
 * Tarjeta del catálogo `/rooms` (tema claro, CTA al flujo de reserva).
 */
export default function CatalogRoomCard({ room }) {
  const portfolioDemo = isPortfolioDemo();
  const n = Number(room.capacity);
  const capacityLabel = !Number.isFinite(n)
    ? "—"
    : n === 1
      ? "1 huésped"
      : `Hasta ${n} huéspedes`;

  const detailHref = `/rooms/${encodeURIComponent(room.id)}`;

  return (
    <article className="hotel-card group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <Link
        href={detailHref}
        className="flex min-h-0 min-w-0 flex-1 flex-col text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        <RoomCoverImage
          imageUrl={room.imageUrl}
          alt={`Foto de ${room.name}`}
          aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 border-t border-white/30 p-6">
          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="font-serif text-2xl font-normal leading-snug text-brand-dark">
              {room.name}
            </h2>
            <span className="w-fit max-w-full rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-dark">
              {capacityLabel}
            </span>
          </div>

          <div className="min-h-[2.875rem] min-w-0 flex-1 sm:min-h-[3.25rem]">
            {room.description ? (
              <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted-hotel">
                {room.description}
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-hotel">
                Espacio listo para tu estadía.
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="grid min-w-0 grid-cols-2 gap-3 border-t border-white/30 px-6 pb-6 pt-4 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]">
        <Link
          className="hotel-btn-primary flex min-h-[3rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg sm:px-3"
          href={`/reservations/new?roomId=${encodeURIComponent(room.id)}`}
          aria-label={
            portfolioDemo
              ? "Abrir formulario de reserva en modo demostración (sin envío)"
              : undefined
          }
        >
          <span>{portfolioDemo ? "Reservar" : "Reservar esta habitación"}</span>
          {portfolioDemo ? (
            <span className="text-[10px] font-normal leading-none text-white/90"></span>
          ) : null}
        </Link>
        <Link
          href={detailHref}
          className="hotel-btn-secondary flex min-h-[3rem] min-w-0 items-center justify-center rounded-full px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:bg-brand/5 sm:px-3"
        >
          Ver ficha
        </Link>
      </div>
    </article>
  );
}
