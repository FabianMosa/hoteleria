"use client";

/**
 * Barra de búsqueda del home (presentación + estado controlado por el padre).
 */
export default function HomeSearchForm({
  destination,
  onDestinationChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  guests,
  onGuestsChange,
  onSearchClick,
}) {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_0.9fr_0.9fr_0.7fr_auto] sm:items-end sm:gap-2 sm:p-5">
      <label className="grid gap-1">
        <span className="text-xs font-medium text-zinc-700">¿A dónde quieres ir?</span>
        <input
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
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
          onChange={(e) => onStartDateChange(e.target.value)}
          className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-medium text-zinc-700">¿Cuándo saldrás?</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm outline-none ring-zinc-900/10 focus:ring-4"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-medium text-zinc-700">Huéspedes</span>
        <select
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
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
        <button
          type="button"
          onClick={onSearchClick}
          className="h-11 w-full rounded-2xl bg-orange-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 sm:w-auto"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
