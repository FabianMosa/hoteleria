## Principios

- Mantener cambios pequeños y verificables (UI + API).
- Evitar “magia” en el frontend: preferir componentes simples, estado explícito y UX responsive.
- Documentar cambios críticos en `README.md` y esta guía.

## Frontend

- Next.js App Router (ver `app/`).
- Tailwind CSS (ver `app/globals.css`).
- Regla de UX: las vistas deben ser **responsivas** (mobile-first, luego `sm/ lg`).

## Convenciones para cambios de UI

- La Home (`/`) sirve como landing + exploración rápida.
- El catálogo (`/rooms`) concentra el listado “puro” de habitaciones.
- La creación de reserva (`/reservations/new`) es el flujo real que consume `POST /api/bookings`.

## Checklist antes de cerrar un cambio

- Ejecutar `npm run dev` y validar:
  - Home carga y muestra cards.
  - Navegación a `/rooms` y “Reservar” funciona.
- Revisar lint (`npm run lint`) si se tocó frontend.
- Confirmar que `.gitignore` no sube:
  - `node_modules/`, `.next/`, `.env*`, `dev.db*`, `.cursor/`.
