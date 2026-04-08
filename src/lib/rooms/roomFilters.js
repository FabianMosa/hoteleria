/**
 * Filtros de catálogo en cliente (MVP).
 * La regla de negocio “real” (disponibilidad, precios) vive en API/Prisma (`@backend`).
 */

export function normalizeString(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * @param {Array<{ id?: string, name?: string, description?: string, capacity?: number }>} rooms
 * @param {{
 *   destination: string,
 *   minCapacity: number,
 *   brandIbis: boolean,
 *   brandStyles: boolean,
 *   accessibility: boolean,
 * }} criteria
 */
export function filterRooms(rooms, criteria) {
  const query = normalizeString(criteria.destination);

  return rooms.filter((room) => {
    const name = normalizeString(room?.name);
    const description = normalizeString(room?.description);
    const matchesQuery =
      !query || name.includes(query) || description.includes(query);
    const matchesCapacity =
      Number(room?.capacity ?? 0) >= Number(criteria.minCapacity ?? 1);

    const idString = String(room?.id ?? "");
    const hash = Array.from(idString).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const isIbis = hash % 2 === 0;
    const matchesBrand =
      (isIbis && criteria.brandIbis) || (!isIbis && criteria.brandStyles);

    const matchesAccessibility =
      !criteria.accessibility || Number(room?.capacity ?? 0) >= 2;

    return (
      matchesQuery &&
      matchesCapacity &&
      matchesBrand &&
      matchesAccessibility
    );
  });
}
