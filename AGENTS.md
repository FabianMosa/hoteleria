# AGENTS — Hotelería

## Principios

- Cambios pequeños y verificables; UI responsive (mobile-first).
- Comentarios donde aporten contexto.
- Convención de carpetas alineada con `ai-team/orchestrator.md` y [docs/ARQUITECTURA-COMPONENTES.md](./docs/ARQUITECTURA-COMPONENTES.md).

## Frontend

- Componentes en `components/layout/` y `components/features/**`.
- Páginas en `app/**/page.js` solo componen; evitar lógica de negocio duplicada.
- Datos de listado vía `src/lib/hooks/useRooms.js` (API propia).

## Backend

- `app/api/**`, `src/lib/prisma.js`, `src/lib/bookings/**`.

## Checklist

- `npm run dev`, `npm run lint`, `npm test` según lo tocado.
- Si cambia el esquema: Prisma + docs de despliegue/BD.
