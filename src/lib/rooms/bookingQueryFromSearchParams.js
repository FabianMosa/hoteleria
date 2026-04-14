/**
 * Serializa parámetros de búsqueda del buscador (home) para anexarlos a `/rooms/[id]` o a la reserva.
 * Solo incluye claves conocidas y valores string no vacíos.
 */
export function bookingQueryFromSearchParams(searchParams) {
  if (!searchParams || typeof searchParams !== "object") return "";

  const out = new URLSearchParams();
  const keys = ["startDate", "endDate", "guests"];

  for (const key of keys) {
    const raw = searchParams[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === "string" && value.trim()) {
      out.set(key, value.trim());
    }
  }

  return out.toString();
}
