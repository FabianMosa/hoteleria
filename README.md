# Hoteleria - MVP de reservas (Full Booking + BD real)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Hoteleria MVP (Reservas)

Este MVP implementa un flujo básico de reservas con Next.js (App Router) y **Prisma + PostgreSQL** (base local vía Docker).
La **Home** (`/`) ahora tiene un layout tipo “buscador + resultados” (inspirado en portales de reserva) con filtros laterales y cards responsivas.
Las páginas del flujo (`/rooms`, `/reservations/new`, `/reservations/[id]`) mantienen un estilo oscuro para diferenciar el “catálogo/flujo” del landing.

Nota: algunos filtros de la Home son **demo (MVP)** mientras el modelo de datos solo incluye `Room { name, description, capacity }`.

### Rutas

- Home principal: `/`
- Catálogo: `GET /rooms` (consume `GET /api/rooms`)
- Crear reserva: `POST /api/bookings` desde el formulario en `/reservations/new`
- Confirmación: `/reservations/[id]`

### Setup local (PostgreSQL con Docker)

Guía paso a paso (local + Docker Hub): [docs/GUIA-POSTGRES-DOCKER.md](./docs/GUIA-POSTGRES-DOCKER.md).

1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y revisa `DATABASE_URL` (debe coincidir con `docker-compose.yml`).
3. Levanta PostgreSQL: `npm run db:up` (o `docker compose up -d`).
4. Espera a que el contenedor esté listo (healthcheck) y aplica el esquema: `npm run db:push` (`prisma db push`).
5. Carga datos de ejemplo: `npm run db:seed` (o `npx prisma db seed`).
6. Arranca la app: `npm run dev`

Para detener el contenedor: `npm run db:down`.

**Nota:** Si antes usabas SQLite (`dev.db`), migra los datos a mano o empieza con una BD vacía en Postgres; el proveedor de Prisma ahora es `postgresql`.

Luego abre `http://localhost:3000/`.
