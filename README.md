# Hotelería — MVP de reservas

Next.js (App Router), Prisma, PostgreSQL. Alias de import: `@/` → raíz del repo (`jsconfig.json`).

## Estructura (componentes)

- **`app/`** — Rutas y páginas delgadas. Catálogo en `/rooms`; ficha individual en **`/rooms/[id]`** (foto, descripción, botones de reserva y vuelta al catálogo).
- **`components/layout/`** — Shell global (`SiteHeader`, `SiteFooter`), importados desde `app/layout.js`. El pie añade enlaces típicos de hotel (contacto y redes); conviene ajustar correo, teléfono y URLs en `SiteFooter.jsx` para producción.
- **`components/features/<dominio>/`** — UI por feature (home, rooms).
- **`src/lib/hooks/`** — Hooks cliente (p. ej. `useRooms` → `GET /api/rooms`).
- **`src/lib/rooms/`** — Utilidades puras de filtrado/fechas (MVP; dominio real en API). El home filtra por tipo de habitación (Individual / Doble / Suite), capacidad y accesibilidad.
- **`ai-team/orchestrator.md`** — Orquestación de agentes y mapeo carpetas ↔ roles.

Documentación detallada: [docs/ARQUITECTURA-COMPONENTES.md](./docs/ARQUITECTURA-COMPONENTES.md).

## Comandos

```bash
npm install
npm run dev
npm run lint
npm test
```

### Railway / PostgreSQL

- Variable `DATABASE_URL` (cadena `postgresql://…` que provee Railway).
- Migraciones versionadas en `prisma/migrations/`: **`npm run db:migrate`** (equivalente a `npx prisma migrate deploy`). Hazlo **antes** del seed en una BD nueva; el seed no crea tablas.
- Ajuste rápido del esquema en entornos de prueba (sin nueva migración): `npm run db:push` — usar con cuidado si compartes la misma BD que producción.
- Datos de ejemplo: `npm run db:seed` (idempotente si ya hay habitaciones). El modelo `Room` incluye `imageUrl` opcional (URLs absolutas); el seed demo usa Unsplash — si añades otro dominio de imágenes, configura `images.remotePatterns` en `next.config.mjs`.

### Demo portafolio (solo lectura)

- En `.env`: `NEXT_PUBLIC_PORTFOLIO_DEMO=true` — `POST /api/bookings` responde 403. El flujo de reserva en UI sigue disponible: enlaces a `/reservations/new` y formulario en **vista previa** (campos deshabilitados, valores de ejemplo, sin envío).
- Plantilla de variables: [.env.example](./.env.example).

## Stack

Definido en [STACK.md](./STACK.md) (perfil default `next-tailwind`). La UI usa **tema claro** fijo (`app/globals.css`: paleta piedra + acento teal, componentes `hotel-*`). No hay flujo de login: la reserva es con datos de huésped en el formulario.
