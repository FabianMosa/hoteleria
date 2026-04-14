"use client";

/**
 * Buscador principal del home: destino, fechas y huéspedes (estado controlado por el padre).
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
    <div className="grid gap-3 bg-surface p-4 sm:grid-cols-[1.15fr_0.95fr_0.95fr_0.75fr_auto] sm:items-end sm:gap-3 sm:p-5">
      <div className="grid gap-1.5">
        <span
          className="text-xs font-medium text-muted-hotel"
          id="destination-label"
        >
          Destino
        </span>
        <input
          aria-labelledby="destination-label"
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          className="hotel-input"
          placeholder="Ciudad o palabra clave"
          data-testid="destination-input"
          inputMode="search"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-1.5">
        <span
          className="text-xs font-medium text-muted-hotel"
          id="start-date-label"
        >
          Llegada
        </span>
        <input
          type="date"
          aria-labelledby="start-date-label"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="hotel-input"
        />
      </div>

      <div className="grid gap-1.5">
        <span className="text-xs font-medium text-muted-hotel" id="end-date-label">
          Salida
        </span>
        <input
          type="date"
          aria-labelledby="end-date-label"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="hotel-input"
        />
      </div>

      <label className="grid gap-1.5">
        <span className="text-xs font-medium text-muted-hotel">Huéspedes</span>
        <select
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="hotel-input"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:pb-[1px]">
        <button
          type="button"
          onClick={onSearchClick}
          className="hotel-btn-primary h-11 w-full px-6 sm:w-auto"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
