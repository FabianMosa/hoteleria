import Link from "next/link";
import HomeRoomCard from "./HomeRoomCard";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

/**
 * Resultados del home: título, estados y grid de tarjetas.
 */
export default function HomeResultsSection({
  status,
  destination,
  rooms,
  filteredRooms,
  bookingQuery,
}) {
  const portfolioDemo = isPortfolioDemo();

  return (
    <section className="order-1 sm:order-2">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {destination
              ? `${destination}: habitaciones para tu estadía`
              : "Nuestras habitaciones"}
          </h2>
          <p className="mt-1 text-sm text-muted-hotel">
            {status === "ready"
              ? `${filteredRooms.length} opción(es) según tus filtros`
              : status === "loading"
                ? "Cargando catálogo…"
                : "No pudimos cargar el catálogo. Revisa tu conexión e intenta de nuevo."}
          </p>
        </div>

        <Link
          href="/rooms"
          className="hotel-btn-secondary w-full shrink-0 sm:w-auto"
        >
          Ver catálogo completo
        </Link>
      </header>

      {status === "loading" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-56 animate-pulse rounded-2xl border border-border-hotel bg-surface-muted"
            />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            No pudimos cargar las habitaciones. Intenta actualizar la página.
          </p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-border-hotel bg-surface-muted/60 p-6">
          <p className="text-sm text-foreground">
            No hay habitaciones que coincidan con esos criterios.
            {rooms.length > 0 ? (
              <span className="mt-2 block text-xs text-muted-hotel">
                Hay {rooms.length} en catálogo: prueba ampliar el destino o quitar algún
                filtro de tipo.
              </span>
            ) : null}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* min-w-0 en cada celda: el hijo del grid puede encogerse sin desbordar el track (evita cortes). */}
          {filteredRooms.map((room) => {
            const roomId = String(room?.id ?? "");
            const reserveHref = `/reservations/new?roomId=${encodeURIComponent(roomId)}${
              bookingQuery ? `&${bookingQuery}` : ""
            }`;
            const detailHref = `/rooms/${encodeURIComponent(roomId)}${
              bookingQuery ? `?${bookingQuery}` : ""
            }`;
            return (
              <div key={roomId} className="min-h-0 min-w-0">
                <HomeRoomCard
                  room={room}
                  reserveHref={reserveHref}
                  detailHref={detailHref}
                  portfolioDemo={portfolioDemo}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
