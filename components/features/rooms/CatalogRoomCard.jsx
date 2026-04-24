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
    <article className="hotel-card group flex h-full min-h-0 min-w-0 flex-col">
      <Link
        href={detailHref}
        className="flex min-h-0 min-w-0 flex-1 flex-col text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <RoomCoverImage
          imageUrl={room.imageUrl}
          alt={`Foto de ${room.name}`}
          aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 border-t border-border-hotel/80 p-5">
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="text-lg font-semibold leading-snug text-foreground">
              {room.name}
            </h2>
            <span className="w-fit max-w-full rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold leading-tight text-brand-hover sm:px-3 sm:text-xs">
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

      <div className="grid min-w-0 grid-cols-2 gap-2 border-t border-border-hotel/80 px-5 pb-5 pt-3 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]">
        <Link
          className="hotel-btn-primary flex min-h-[2.75rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-center text-xs font-semibold leading-tight sm:px-3 sm:text-sm"
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
          className="hotel-btn-secondary flex min-h-[2.75rem] min-w-0 items-center justify-center rounded-xl px-2 py-2 text-center text-xs font-semibold leading-tight sm:px-3 sm:text-sm"
        >
          Ver ficha
        </Link>
      </div>
    </article>
  );
}
