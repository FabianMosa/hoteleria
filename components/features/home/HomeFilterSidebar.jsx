"use client";

/**
 * Filtros laterales demo del home (MVP). Estilos vía Tailwind (`@styling`).
 */
export default function HomeFilterSidebar({
  brandIbis,
  onBrandIbisChange,
  brandStyles,
  onBrandStylesChange,
  minCapacity,
  onMinCapacityChange,
  accessibility,
  onAccessibilityChange,
}) {
  return (
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
                  onChange={(e) => onBrandIbisChange(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Hotel
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={brandStyles}
                  onChange={(e) => onBrandStylesChange(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Hostal
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
                onChange={(e) => onMinCapacityChange(Number(e.target.value))}
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
                onChange={(e) => onAccessibilityChange(e.target.checked)}
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
  );
}
