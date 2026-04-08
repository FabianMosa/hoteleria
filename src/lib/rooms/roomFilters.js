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
 * Clasifica el tipo de habitación para el filtro lateral: prioriza palabras en el nombre
 * y, si no hay coincidencia, usa capacidad como respaldo (1 / 2 / resto).
 * @param {{ name?: string, capacity?: number }} room
 * @returns {'individual' | 'doble' | 'suite'}
 */
export function inferRoomKind(room) {
  const n = normalizeString(room?.name);
  if (n.includes("individual")) return "individual";
  if (n.includes("doble")) return "doble";
  if (n.includes("suite")) return "suite";
  const c = Number(room?.capacity ?? 0);
  if (c <= 1) return "individual";
  if (c === 2) return "doble";
  return "suite";
}

/**
 * @param {Array<{ id?: string, name?: string, description?: string, capacity?: number }>} rooms
 * @param {{
 *   destination: string,
 *   minCapacity: number,
 *   typeIndividual: boolean,
 *   typeDoble: boolean,
 *   typeSuite: boolean,
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

    const kind = inferRoomKind(room);
    const matchesType =
      (kind === "individual" && criteria.typeIndividual) ||
      (kind === "doble" && criteria.typeDoble) ||
      (kind === "suite" && criteria.typeSuite);

    const matchesAccessibility =
      !criteria.accessibility || Number(room?.capacity ?? 0) >= 2;

    return (
      matchesQuery &&
      matchesCapacity &&
      matchesType &&
      matchesAccessibility
    );
  });
}
