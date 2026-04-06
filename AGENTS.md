# AGENTS — Guía para trabajo asistido (Hotelería)

## Principios

- Mantener cambios pequeños y verificables (UI + API).
- Evitar “magia” en el frontend: componentes simples, estado explícito y UX **responsive** (mobile-first, luego `sm` / `lg`).
- Incluir **comentarios** donde aporte contexto (no relleno obvio).
- Documentar cambios críticos en este archivo y en `README.md`.

## Frontend

- Next.js App Router: `app/`.
- Estilos: Tailwind CSS, `app/globals.css`.
- Home (`/`): landing + exploración; el campo “destino” filtra por texto en nombre/descripción de `Room` (vacío = ver todas).
- Catálogo: `/rooms` (listado “puro”).
- Reserva real: `/reservations/new` → `POST /api/bookings`.

## Backend y datos

- Prisma: `prisma/schema.prisma`; cliente singleton: `src/lib/prisma.js`.
- PostgreSQL local: `docker-compose.yml`; variables en `.env` (plantilla `.env.example`).
- Scripts: `npm run db:up`, `db:down`, `db:push`, `db:seed` (`prisma db seed` carga `.env`).
- Seed (`prisma/seed.js`): solo inserta habitaciones de ejemplo si `Room` está vacío; si no, informa en consola y sale sin error.
- Disponibilidad de reservas: `src/lib/bookings/availability.js`.
- Guía operativa Docker/Postgres: `docs/GUIA-POSTGRES-DOCKER.md`.

## Orquestación con agentes (opcional)

- Roles y reglas adicionales: carpeta `ai-team/` (p. ej. `orchestrator.md` — memoria, delegación, BD/seed).
- No sustituye esta guía: aquí van convenciones del **repo**; `ai-team/` orienta flujos multi-agente.

## Checklist antes de cerrar un cambio

- `npm run dev`: Home muestra cards (destino vacío o texto que coincida con el seed); `/rooms` y “Reservar” funcionan.
- Si tocó frontend: `npm run lint`.
- Si tocó schema o Docker: `README.md` / esta guía actualizados cuando el cambio lo amerite.
- `.gitignore` no debe versionar: `node_modules/`, `.next/`, `.env*`, `dev.db*`, `.cursor/`.
