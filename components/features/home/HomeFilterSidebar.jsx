"use client";

/**
 * Filtros laterales demo del home (MVP). Estilos vía Tailwind (`@styling`).
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
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-900">Buscar por</p>

        <div className="mt-4 grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Tipo de habitación
            </p>
            <div className="mt-2 grid gap-2">
              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={typeIndividual}
                  onChange={(e) => onTypeIndividualChange(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Individual
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={typeDoble}
                  onChange={(e) => onTypeDobleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Doble
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={typeSuite}
                  onChange={(e) => onTypeSuiteChange(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300"
                />
                Suite
              </label>
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
        </div>
      </div>
    </aside>
  );
}
