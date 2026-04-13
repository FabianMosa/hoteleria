# AGENTS — Hotelería

## Principios

- Cambios pequeños y verificables; UI responsive (mobile-first).
- Tema visual claro en todo el sitio (sin oscurecer por `prefers-color-scheme`).
- Comentarios donde aporten contexto.
- Convención de carpetas alineada con `ai-team/orchestrator.md` y [docs/ARQUITECTURA-COMPONENTES.md](./docs/ARQUITECTURA-COMPONENTES.md).

## Frontend

- Componentes en `components/layout/` y `components/features/**`.
- Shell global: `SiteHeader` + `SiteFooter` en `app/layout.js` (navegación y pie en todas las rutas).
- Páginas en `app/**/page.js` solo componen; evitar lógica de negocio duplicada.
- Datos de listado vía `src/lib/hooks/useRooms.js` (API propia); cada habitación puede exponer `imageUrl` (foto en tarjetas home y `/rooms`).
- Filtros del home (`HomeFilterSidebar` + `src/lib/rooms/roomFilters.js`): tipo de habitación (Individual / Doble / Suite), sin “marcas”.

## Backend

- `app/api/**`, `src/lib/prisma.js`, `src/lib/bookings/**`.
- Modo portafolio: `NEXT_PUBLIC_PORTFOLIO_DEMO=true` en `src/lib/portfolioDemo.js` — bloquea `POST /api/bookings` (403) y oculta/sustituye CTAs de reserva en UI.
- PostgreSQL en producción/desarrollo remoto: `DATABASE_URL` (p. ej. Railway); Prisma `migrate deploy` / `db push` según el flujo elegido.

## Checklist

- `npm run dev`, `npm run lint`, `npm test` según lo tocado.
- Si cambia el esquema: Prisma + docs de despliegue/BD.
