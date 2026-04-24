"use client";

const GUEST_OPTIONS = [1, 2, 3];
const LABEL_CLASS = "text-xs font-medium text-muted-hotel";

/**
 * Campo de fecha reutilizable para mantener consistencia visual y semántica.
 */
function DateField({ id, label, value, onChange }) {
  return (
    <div className="grid gap-1.5">
      <span className={LABEL_CLASS} id={id}>
        {label}
      </span>
      <input
        type="date"
        aria-labelledby={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hotel-input"
      />
    </div>
  );
}

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
        <span className={LABEL_CLASS} id="destination-label">
          Destino
        </span>
        {/* Destino fijo por requerimiento de negocio: no se permite búsqueda manual. */}
        <input
          aria-labelledby="destination-label"
          value="Ciudad"
          readOnly
          aria-readonly="true"
          className="hotel-input"
          data-testid="destination-input"
          autoComplete="off"
        />
      </div>

      <DateField
        id="start-date-label"
        label="Llegada"
        value={startDate}
        onChange={onStartDateChange}
      />

      <DateField
        id="end-date-label"
        label="Salida"
        value={endDate}
        onChange={onEndDateChange}
      />

      <label className="grid gap-1.5">
        <span className={LABEL_CLASS}>Huéspedes</span>
        <select
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="hotel-input"
          data-testid="guests-select"
        >
          {GUEST_OPTIONS.map((n) => (
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
