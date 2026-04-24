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
        <p className="text-sm font-semibold text-foreground">
          Refinar búsqueda
        </p>

        <div className="mt-4 grid gap-5">
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
