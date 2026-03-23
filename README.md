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

Este MVP implementa un flujo básico de reservas con Next.js (App Router) y Prisma + SQLite.
El estilo visual del flujo principal (`/`, `/rooms`, `/reservations/new`, `/reservations/[id]`) usa fondo oscuro y tipografia clara para mejor legibilidad.

### Rutas

- Home principal: `/`
- Catálogo: `GET /rooms` (consume `GET /api/rooms`)
- Crear reserva: `POST /api/bookings` desde el formulario en `/reservations/new`
- Confirmación: `/reservations/[id]`

### Setup local

1. Instala dependencias: `npm install`
2. Configura `.env`:
   - Copia `.env.example` a `.env` (o define `DATABASE_URL` manualmente).
3. Inicializa/crea el esquema en SQLite: `npx prisma db push`
4. Carga seed de habitaciones: `node prisma/seed.js`
5. Arranca el servidor: `npm run dev`

Luego abre `http://localhost:3000/`.
