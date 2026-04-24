import Link from "next/link";
import RoomCoverImage from "@/components/features/rooms/RoomCoverImage";

/**
 * Tarjeta de habitación en el home: bloque superior enlaza a la ficha `/rooms/[id]`; los botones mantienen reserva y atajo explícito.
 */
export default function HomeRoomCard({
  room,
  reserveHref,
  detailHref,
  portfolioDemo,
}) {
  const n = Number(room?.capacity);
  // Texto legible sin abreviar mal; nowrap evita cortes raros junto a overflow-hidden del card.
  const capacityLabel = !Number.isFinite(n)
    ? "—"
    : n === 1
      ? "1 huésped"
      : `Hasta ${n} huéspedes`;

  return (
    <article className="hotel-card group flex h-full min-h-0 min-w-0 flex-col">
      {/* Un solo enlace envuelve foto + texto: clic en la habitación abre el detalle (sin anidar otros Link). */}
      <Link
        href={detailHref}
        className="flex min-h-0 min-w-0 flex-1 flex-col text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <RoomCoverImage
          imageUrl={room?.imageUrl}
          alt={`Foto de ${room?.name ?? "habitación"}`}
          aspectClassName="aspect-[5/3] sm:aspect-[16/9]"
        />
        {/* Cuerpo en columna + flex-1 para igualar alturas en la grilla; CTAs van fuera del Link. */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 border-t border-border-hotel/80 p-4 sm:p-5">
          <div className="flex min-w-0 flex-col gap-2">
            <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
              {room?.name ?? "Habitación"}
            </h3>
            <span className="w-fit max-w-full rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold leading-tight text-brand-hover sm:px-3 sm:text-xs">
              {capacityLabel}
            </span>
          </div>

          <div className="min-h-[2.875rem] min-w-0 sm:min-h-[3.25rem]">
            {room?.description ? (
              <p className="line-clamp-2 break-words text-sm leading-relaxed text-muted-hotel">
                {room.description}
              </p>
            ) : (
              <p className="line-clamp-2 break-words text-sm leading-relaxed text-muted-hotel">
                Espacio cómodo para tu próxima visita.
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="grid min-w-0 grid-cols-2 gap-2 border-t border-border-hotel/80 p-4 pt-3 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] sm:px-5 sm:pb-5">
        <Link
          href={reserveHref}
          className="hotel-btn-primary flex min-h-[2.75rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-center text-xs font-semibold leading-tight sm:px-3 sm:text-sm"
          aria-label={
            portfolioDemo
              ? "Abrir formulario de reserva (vista demo, sin envío)"
              : undefined
          }
        >
          <span>Reservar</span>
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
