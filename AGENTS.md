# Agentes - Hoteleria

## Estado del MVP

- Home principal de hoteleria en `/` (reemplaza la pagina por defecto de Next.js)
- Estilo global del flujo principal con fuente clara y fondo oscuro (home, rooms, reserva, confirmacion)
- Catálogo de habitaciones: `GET /api/rooms` + UI en `/rooms`
- Reservas:
  - Formulario: `POST /api/bookings` + UI en `/reservations/new`
  - Confirmación: UI en `/reservations/[id]`
- Persistencia:
  - Prisma + SQLite (`dev.db`)
  - Seed mínimo de habitaciones (`prisma/seed.js`)

## Progreso del plan

- `db-setup`: hecho
- `db-seed`: hecho
- `db-booking-validation`: hecho
- `api-rooms`: hecho
- `api-bookings`: hecho
- `ui-rooms`: hecho
- `ui-booking-form`: hecho
- `ui-confirmation`: hecho
- `validation`: hecho
- `docs-gitignore`: en progreso/completado al finalizar esta sección
- `qa`: pendiente

