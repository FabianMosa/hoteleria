"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function normalizeString(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function formatISODate(date) {
  // Input type="date" expects YYYY-MM-DD.
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HomeExplorer() {
  // Buscador (UI): filtro por texto en nombre/descripción del seed (no hay campo "ciudad" en BD).
  // Vacío = mostrar todas las habitaciones cargadas desde /api/rooms (evita 0 resultados al cargar).
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(() => formatISODate(new Date()));
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [minCapacity, setMinCapacity] = useState(1);

  // Datos (reutiliza el endpoint existente).
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready

  // Filtros laterales (MVP): se pueden conectar luego a un modelo real.
  const [brandIbis, setBrandIbis] = useState(true);
  const [brandStyles, setBrandStyles] = useState(true);
  const [accessibility, setAccessibility] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setStatus("loading");
      try {
        const res = await fetch("/api/rooms", { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setRooms(Array.isArray(data.rooms) ? data.rooms : []);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRooms = useMemo(() => {
    const query = normalizeString(destination);

    // Nota: el “destino” no existe en el modelo actual de Room; lo usamos como
    // filtro de texto contra el nombre/descripcion para dar utilidad inmediata.
    return rooms.filter((room) => {
      const name = normalizeString(room?.name);
      const description = normalizeString(room?.description);
      const matchesQuery = !query || name.includes(query) || description.includes(query);
      const matchesCapacity = Number(room?.capacity ?? 0) >= Number(minCapacity ?? 1);

      // “Marcas” ficticias (MVP): alternamos por paridad del id para simular categorías.
      const idString = String(room?.id ?? "");
      const hash = Array.from(idString).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      const isIbis = hash % 2 === 0;
      const matchesBrand = (isIbis && brandIbis) || (!isIbis && brandStyles);

      // Accesibilidad (ficticia): si se activa, exigimos capacidad >= 2 como proxy.
      const matchesAccessibility = !accessibility || Number(room?.capacity ?? 0) >= 2;

      return matchesQuery && matchesCapacity && matchesBrand && matchesAccessibility;
    });
  }, [rooms, destination, minCapacity, brandIbis, brandStyles, accessibility]);

  // Calcula el querystring para llevar al flujo real de reserva (por habitación).
  const bookingQuery = useMemo(() => {
    const params = new URLSearchParams();
    // Reservas reales requieren roomId; acá solo guardamos preferencia de fecha/huéspedes.
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (guests) params.set("guests", String(guests));
    return params.toString();
  }, [startDate, endDate, guests]);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      {/* Barra de búsqueda */}
      <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_0.9fr_0.9fr_0.7fr_auto] sm:items-end sm:gap-2 sm:p-5">
        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">¿A dónde quieres ir?</span>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
            placeholder="Ej. Antofagasta (opcional; vacío = ver todo)"
            data-testid="destination-input"
            inputMode="search"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">¿Cuándo llegarás?</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">¿Cuándo saldrás?</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700">Huéspedes</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} huésped{n === 1 ? "" : "es"}
              </option>
            ))}
          </select>
        </label>

        <div className="sm:pb-[1px]">
          {/* Botón “Buscar”: en MVP filtra la sección inferior (no navega). */}
          <button
            type="button"
            onClick={() => {
              // Intencional: el filtrado ya ocurre por estado; mantenemos un botón
              // porque el layout de referencia lo incluye.
            }}
            className="h-11 w-full rounded-2xl bg-orange-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 sm:w-auto"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Resultados + filtros */}
      <div className="grid gap-6 p-4 sm:grid-cols-[260px_1fr] sm:p-6">
        <aside className="order-2 sm:order-1">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-900">Buscar por</p>

            <div className="mt-4 grid gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Marcas
                </p>
                <div className="mt-2 grid gap-2">
                  <label className="flex items-center gap-2 text-sm text-zinc-800">
                    <input
                      type="checkbox"
                      checked={brandIbis}
                      onChange={(e) => setBrandIbis(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300"
                    />
                    ibis
                  </label>
                  <label className="flex items-center gap-2 text-sm text-zinc-800">
                    <input
                      type="checkbox"
                      checked={brandStyles}
                      onChange={(e) => setBrandStyles(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300"
                    />
                    ibis Styles
                  </label>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Capacidad mínima
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="w-8 text-right text-sm font-medium text-zinc-800">
                    {minCapacity}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Accesibilidad
                </p>
                <label className="mt-2 flex items-center gap-2 text-sm text-zinc-800">
                  <input
                    type="checkbox"
                    checked={accessibility}
                    onChange={(e) => setAccessibility(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  Accesible en silla de ruedas
                </label>
              </div>

              <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
                <p className="text-xs text-zinc-600">
                  Consejo (MVP): estos filtros son demo; cuando agreguemos “hotel/ciudad/amenities”
                  al modelo, se conectan directo a la BD.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="order-1 sm:order-2">
          <header className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">
                {destination ? `${destination}: descubre nuestros hoteles` : "Descubre nuestros hoteles"}
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
                  <article
                    key={roomId}
                    className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
                  >
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
                        <p className="line-clamp-2 text-sm text-zinc-600">
                          {room.description}
                        </p>
                      ) : (
                        <p className="text-sm text-zinc-600">
                          Ideal para tu próxima estadía.
                        </p>
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
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

