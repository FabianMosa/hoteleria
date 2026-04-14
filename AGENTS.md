# AGENTS — Hotelería

## Principios

- Cambios pequeños y verificables; UI responsive (mobile-first).
- Tema visual claro en todo el sitio (sin oscurecer por `prefers-color-scheme`).
- Comentarios donde aporten contexto.
- Convención de carpetas alineada con `ai-team/orchestrator.md` y [docs/ARQUITECTURA-COMPONENTES.md](./docs/ARQUITECTURA-COMPONENTES.md).

## Frontend

- Tokens y utilidades de hotelería (`hotel-card`, `hotel-btn-*`, colores `brand` / `surface`) en `app/globals.css`; tema siempre claro.
- Sin login en UI: reservas como huésped; cabecera con CTA “Reservar” → `/reservations/new` (en portafolio el formulario es solo visual; el envío sigue bloqueado).
- Componentes en `components/layout/` y `components/features/**`.
- Shell global: `SiteHeader` + `SiteFooter` en `app/layout.js` (navegación y pie en todas las rutas). El pie incluye navegación rápida, contacto (`mailto` / `tel`) e iconos a redes externas (Facebook, Instagram, WhatsApp, Google Maps); las URLs de demo se reemplazan en `components/layout/SiteFooter.jsx`.
- Páginas en `app/**/page.js` solo componen; evitar lógica de negocio duplicada.
- Datos de listado vía `src/lib/hooks/useRooms.js` (API propia); cada habitación puede exponer `imageUrl` (foto en tarjetas home y `/rooms`).
- Ficha de habitación: ruta **`/rooms/[id]`** (`app/rooms/[id]/page.js` + `components/features/rooms/RoomDetailView.jsx`); datos en servidor con Prisma. Clic en tarjeta (home/catálogo) abre la ficha; CTAs de reserva enlazan a `/reservations/new?roomId=…` (query opcional de fechas/huéspedes vía `src/lib/rooms/bookingQueryFromSearchParams.js`).
- Filtros del home (`HomeFilterSidebar` + `src/lib/rooms/roomFilters.js`): tipo (Individual / Doble / Suite), capacidad mínima y accesibilidad, sin “marcas”.

## Backend

- `app/api/**`, `src/lib/prisma.js`, `src/lib/bookings/**`. Lectura pública de habitación: `GET /api/rooms` y `GET /api/rooms/[id]`.
- Modo portafolio: `NEXT_PUBLIC_PORTFOLIO_DEMO=true` en `src/lib/portfolioDemo.js` — bloquea `POST /api/bookings` (403); la UI igual navega al formulario con campos deshabilitados (vista previa, sin captura).
- PostgreSQL en producción/desarrollo remoto: `DATABASE_URL` (p. ej. Railway); Prisma `migrate deploy` / `db push` según el flujo elegido.

## Checklist

- `npm run dev`, `npm run lint`, `npm test` según lo tocado.
- Si cambia el esquema: Prisma + docs de despliegue/BD. BD nueva: `npm run db:migrate` antes de `npm run db:seed` (el seed no crea tablas).
