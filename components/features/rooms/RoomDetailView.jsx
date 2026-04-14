import Link from "next/link";
import RoomCoverImage from "./RoomCoverImage";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

/**
 * Ficha de habitación: hero con foto, datos y CTAs a reserva / catálogo.
 * @param {{ room: { id: string, name: string, description: string | null, imageUrl: string | null, capacity: number }, reserveQuery?: string }} props
 * — `reserveQuery`: query sin `?` (p. ej. fechas desde el home) para anexar al link de reserva.
 */
export default function RoomDetailView({ room, reserveQuery = "" }) {
  const portfolioDemo = isPortfolioDemo();
  const encodedId = encodeURIComponent(room.id);
  const reserveHref =
    `/reservations/new?roomId=${encodedId}` +
    (reserveQuery ? `&${reserveQuery}` : "");

  const n = Number(room.capacity);
  const capacityLabel = !Number.isFinite(n)
    ? "—"
    : n === 1
      ? "1 huésped"
      : `Hasta ${n} huéspedes`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <nav className="mb-6 text-sm text-muted-hotel" aria-label="Migas de pan">
        <Link href="/" className="font-medium text-brand-hover underline-offset-2 hover:underline">
          Inicio
        </Link>
        <span className="mx-2 text-border-hotel" aria-hidden>
          /
        </span>
        <Link href="/rooms" className="font-medium text-brand-hover underline-offset-2 hover:underline">
          Habitaciones
        </Link>
        <span className="mx-2 text-border-hotel" aria-hidden>
          /
        </span>
        <span className="text-foreground">{room.name}</span>
      </nav>

      <article className="hotel-shell overflow-hidden rounded-3xl ring-1 ring-border-hotel/50">
        <RoomCoverImage
          imageUrl={room.imageUrl}
          alt={`Foto de ${room.name}`}
          aspectClassName="aspect-[5/3] sm:aspect-[21/9]"
        />

        <div className="border-t border-border-hotel/80 p-5 sm:p-8">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Ficha
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {room.name}
              </h1>
              <p className="mt-3 text-sm text-muted-hotel sm:text-base">{capacityLabel}</p>
            </div>
          </header>

          <div className="mt-6 max-w-3xl">
            {room.description ? (
              <p className="text-sm leading-relaxed text-foreground sm:text-base">
                {room.description}
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-hotel sm:text-base">
                Consultá disponibilidad y completá la reserva con tus datos de contacto.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-border-hotel pt-6 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={reserveHref}
              className="hotel-btn-primary flex min-h-[2.75rem] w-full flex-col items-center justify-center gap-0.5 rounded-xl px-4 py-2.5 text-center text-sm font-semibold sm:w-auto sm:min-w-[12rem]"
              aria-label={
                portfolioDemo
                  ? "Abrir formulario de reserva (vista demo, sin envío)"
                  : undefined
              }
            >
              <span>{portfolioDemo ? "Reservar" : "Reservar esta habitación"}</span>
              {portfolioDemo ? (
                <span className="text-[10px] font-normal leading-none text-white/90">
                  Vista demo
                </span>
              ) : null}
            </Link>
            <Link
              href="/rooms"
              className="hotel-btn-secondary flex min-h-[2.75rem] w-full items-center justify-center rounded-xl px-4 py-2.5 text-center text-sm font-semibold sm:w-auto sm:min-w-[12rem]"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
