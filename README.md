# Hotelería — MVP de reservas

Next.js (App Router), Prisma, PostgreSQL. Alias de import: `@/` → raíz del repo (`jsconfig.json`).

## Estructura (componentes)

- **`app/`** — Rutas y páginas delgadas.
- **`components/layout/`** — Shell global (`SiteHeader`, `SiteFooter`), importados desde `app/layout.js`.
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
- Migraciones versionadas en `prisma/migrations/`: `npx prisma migrate deploy`.
- Ajuste rápido del esquema en entornos de prueba (sin nueva migración): `npm run db:push` — usar con cuidado si compartes la misma BD que producción.
- Datos de ejemplo: `npm run db:seed` (idempotente si ya hay habitaciones). El modelo `Room` incluye `imageUrl` opcional (URLs absolutas); el seed demo usa Unsplash — si añades otro dominio de imágenes, configura `images.remotePatterns` en `next.config.mjs`.

### Demo portafolio (solo lectura)

- En `.env`: `NEXT_PUBLIC_PORTFOLIO_DEMO=true` — sin formulario de reserva, `POST /api/bookings` responde 403, CTAs de reserva deshabilitados en UI.
- Plantilla de variables: [.env.example](./.env.example).

## Stack

Definido en [STACK.md](./STACK.md) (perfil default `next-tailwind`). La UI del MVP usa **tema claro** de forma fija (incluido `app/globals.css`).
