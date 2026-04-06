# Hotelería — MVP de reservas

Aplicación **Next.js (App Router)** con **Prisma** y **PostgreSQL** en **Docker**. Flujo: catálogo de habitaciones → formulario de reserva → confirmación (`POST /api/bookings`).

## Stack

| Área | Tecnología |
|------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| API | Route Handlers en `app/api/` |
| Datos | Prisma 6, PostgreSQL 16 (imagen oficial vía `docker-compose.yml`) |
| Cliente DB | `@prisma/client` + singleton en `src/lib/prisma.js` |

## Inicio rápido

1. `npm install` (ejecuta `postinstall` → `prisma generate`)
2. Copia `.env.example` → `.env` y ajusta `DATABASE_URL` para que coincida con `POSTGRES_*` en `docker-compose.yml` (si la contraseña tiene caracteres especiales, codifícala en la URL)
3. `npm run db:up`
4. `npm run db:push`
5. `npm run db:seed` (solo inserta habitaciones de ejemplo si la tabla `Room` está vacía)
6. `npm run dev` → [http://localhost:3000](http://localhost:3000)

Guía detallada (Docker local, Docker Hub, `psql`): [docs/GUIA-POSTGRES-DOCKER.md](./docs/GUIA-POSTGRES-DOCKER.md).

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `dev` / `build` / `start` / `lint` | App Next.js estándar |
| `db:up` / `db:down` | Levanta o detiene PostgreSQL (`docker compose`) |
| `db:push` | Aplica el esquema Prisma a la BD (`prisma db push`) |
| `db:seed` | Datos de ejemplo (`prisma db seed` → carga `.env`) |
| `prisma:generate` / `prisma:validate` | Cliente y validación del schema |

## Rutas y API

| Ruta | Descripción |
|------|-------------|
| `/` | Landing con buscador demo + listado filtrable (consume `GET /api/rooms`) |
| `/rooms` | Catálogo de habitaciones |
| `/reservations/new` | Formulario → `POST /api/bookings` |
| `/reservations/[id]` | Confirmación (lee reserva con Prisma) |
| `GET /api/rooms` | Lista habitaciones |
| `POST /api/bookings` | Crea reserva (validación + solapamiento) |

## UI

- **Home (`/`)**: estilo claro, buscador y filtros laterales (varios filtros son **demo** hasta extender el modelo).
- **Destino en Home**: filtra por texto en **nombre o descripción** de la habitación. Vacío = muestra todo el catálogo.
- **`/rooms` y reservas**: tema oscuro para diferenciar del landing.

## Estructura útil

```
app/                 # páginas, layouts, API routes
app/ui/              # componentes cliente reutilizables (p. ej. HomeExplorer)
prisma/              # schema.prisma, seed.js
src/lib/             # prisma.js (singleton), bookings/availability
docs/                # guías (PostgreSQL + Docker)
ai-team/             # roles/orquestación para flujos con agentes (no sustituye a AGENTS.md)
```

## Notas

- **Seed:** si ya existen filas en `Room`, el seed no duplica; verás mensaje en consola.
- **SQLite:** el proveedor de Prisma es `postgresql`; un `dev.db` antiguo no se usa salvo que cambies el schema de vuelta.
- Plantilla Next genérica: [documentación Next.js](https://nextjs.org/docs).
