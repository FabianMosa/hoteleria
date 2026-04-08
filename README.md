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

Base de datos local: `docker-compose.yml`, `npm run db:up`, `db:push`, `db:seed`. Ver `docs/GUIA-POSTGRES-DOCKER.md` y `docs/DEPLOY-DOCKER-HUB-RAILWAY.md`. Imagen de producción (`Dockerfile`): el contexto de build debe incluir `prisma/schema.prisma` (no ignorarlo en `.dockerignore`).

## Stack

Definido en [STACK.md](./STACK.md) (perfil default `next-tailwind`). La UI del MVP usa **tema claro** de forma fija (incluido `app/globals.css`).
