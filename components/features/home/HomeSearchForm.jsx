"use client";

const GUEST_OPTIONS = [1, 2, 3];
const LABEL_CLASS = "text-xs font-semibold tracking-wider uppercase text-muted-hotel mb-1 block";

/**
 * Campo de fecha reutilizable para mantener consistencia visual y semántica.
 */
function DateField({ id, label, value, onChange }) {
  return (
    <div className="w-full">
      <label className={LABEL_CLASS} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hotel-input w-full bg-white/70 backdrop-blur-sm focus:bg-white transition-colors"
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
    <div className="grid gap-4 rounded-xl bg-transparent p-4 sm:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto] sm:items-end sm:gap-4 sm:p-6 lg:p-8">
      <div className="w-full">
        <label className={LABEL_CLASS} htmlFor="destination-input">
          Destino
        </label>
        {/* Destino fijo por requerimiento de negocio: no se permite búsqueda manual. */}
        <input
          id="destination-input"
          value="Ciudad"
          readOnly
          aria-readonly="true"
          className="hotel-input w-full bg-white/70 backdrop-blur-sm text-brand font-medium cursor-default focus:ring-0 focus:border-border-hotel"
          data-testid="destination-input"
          autoComplete="off"
        />
      </div>

      <DateField
        id="start-date-input"
        label="Llegada"
        value={startDate}
        onChange={onStartDateChange}
      />

      <DateField
        id="end-date-input"
        label="Salida"
        value={endDate}
        onChange={onEndDateChange}
      />

      <div className="w-full">
        <label className={LABEL_CLASS} htmlFor="guests-select">
          Huéspedes
        </label>
        <select
          id="guests-select"
          value={guests}
          onChange={(e) => onGuestsChange(Number(e.target.value))}
          className="hotel-input w-full bg-white/70 backdrop-blur-sm focus:bg-white transition-colors cursor-pointer appearance-none"
          data-testid="guests-select"
        >
          {GUEST_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-auto sm:pb-[1px]">
        <button
          type="button"
          onClick={onSearchClick}
          className="hotel-btn-primary h-12 w-full px-8 sm:w-auto text-base"
        >
          Buscar estadía
        </button>
      </div>
    </div>
  );
}
