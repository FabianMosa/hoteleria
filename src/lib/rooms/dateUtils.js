/**
 * Utilidades de fecha para inputs HTML (sin lógica de negocio de reservas).
 */

/** Devuelve YYYY-MM-DD para <input type="date">. */
export function formatISODate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
