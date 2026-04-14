"use client";

/**
 * Filtros del listado en home (MVP): tipo, capacidad mínima y accesibilidad.
 */
export default function HomeFilterSidebar({
  typeIndividual,
  onTypeIndividualChange,
  typeDoble,
  onTypeDobleChange,
  typeSuite,
  onTypeSuiteChange,
  minCapacity,
  onMinCapacityChange,
  accessibility,
  onAccessibilityChange,
}) {
  return (
    <aside className="order-2 sm:order-1">
      <div className="hotel-card bg-surface p-4 sm:p-5">
        <p className="text-sm font-semibold text-foreground">Refinar búsqueda</p>

        <div className="mt-4 grid gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
              Tipo de habitación
            </p>
            <div className="mt-2 grid gap-2.5">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={typeIndividual}
                  onChange={(e) => onTypeIndividualChange(e.target.checked)}
                  className="h-4 w-4 rounded border-border-hotel text-brand focus:ring-brand"
                />
                Individual
              </label>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={typeDoble}
                  onChange={(e) => onTypeDobleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-border-hotel text-brand focus:ring-brand"
                />
                Doble
              </label>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={typeSuite}
                  onChange={(e) => onTypeSuiteChange(e.target.checked)}
                  className="h-4 w-4 rounded border-border-hotel text-brand focus:ring-brand"
                />
                Suite
              </label>
            </div>
          </div>

          <div>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Capacidad mínima
              </span>
              <select
                value={minCapacity}
                onChange={(e) => onMinCapacityChange(Number(e.target.value))}
                className="hotel-input h-10"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    Desde {n} {n === 1 ? "huésped" : "huéspedes"}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
              Accesibilidad
            </p>
            <label className="mt-2 flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={accessibility}
                onChange={(e) => onAccessibilityChange(e.target.checked)}
                className="h-4 w-4 rounded border-border-hotel text-brand focus:ring-brand"
              />
              Habitación accesible
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
