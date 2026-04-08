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
- Datos de listado vía `src/lib/hooks/useRooms.js` (API propia).
- Filtros del home (`HomeFilterSidebar` + `src/lib/rooms/roomFilters.js`): tipo de habitación (Individual / Doble / Suite), sin “marcas”.

## Backend

- `app/api/**`, `src/lib/prisma.js`, `src/lib/bookings/**`.

## Docker

- `.dockerignore` no debe excluir `prisma/schema.prisma`: sin el schema, `npm ci` falla en `prisma generate` dentro de la imagen.

## Checklist

- `npm run dev`, `npm run lint`, `npm test` según lo tocado.
- Si cambia el esquema: Prisma + docs de despliegue/BD.
