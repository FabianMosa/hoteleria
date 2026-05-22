# Hotelería — MVP de reservas

Next.js (App Router), Prisma, PostgreSQL. Alias de import: `@/` → raíz del repo (`jsconfig.json`).

## Estructura (componentes)

- **`app/`** — Rutas y páginas delgadas. Catálogo en `/rooms`; ficha individual en **`/rooms/[id]`** (foto, descripción, botones de reserva y vuelta al catálogo).
- **`components/layout/`** — Shell global (`SiteHeader`, `SiteFooter`), importados desde `app/layout.js`. El pie añade enlaces típicos de hotel (contacto y redes); conviene ajustar correo, teléfono y URLs en `SiteFooter.jsx` para producción.
- **`components/features/<dominio>/`** — UI por feature (home, rooms).
- En `components/features/home/HomeSearchForm.jsx`, priorizar refactor incremental sin cambios funcionales: mantener props controladas por el padre y extraer subcomponentes/constantes reutilizables para reducir duplicación.
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
- En modo normal, la reserva solicita además **método de pago** (`CARD`, `TRANSFER`, `CASH`) y se guarda en `Booking.paymentMethod`.
- Plantilla de variables: [.env.example](./.env.example).

## Stack

Definido en [STACK.md](./STACK.md) (perfil default `next-tailwind`). La UI usa **tema claro** fijo (`app/globals.css`: paleta piedra + acento teal, componentes `hotel-*`). No hay flujo de login: la reserva es con datos de huésped en el formulario.

## Seguridad

- **Next.js fijado en `16.2.6`** (y `eslint-config-next@16.2.6`) para cerrar 13 CVEs HIGH/MODERATE/LOW de la rama 16.2.0–16.2.5: SSRF en WebSocket upgrades, bypass de middleware (segment-prefetch, dynamic params, i18n), DoS en Server Components / Image Optimization / Cache Components, XSS (CSP nonces, `beforeInteractive`) y cache poisoning en RSC.
- En `package.json` se aplica un `overrides` que fuerza `postcss ≥ 8.5.10` dentro de `next` para neutralizar la copia anidada vulnerable (advisory GHSA-qx2v-qp2m-jg93). Verificable con `npm ls postcss` (debe mostrar `next@16.2.6 → postcss@8.5.15+`).
- **Prisma alineado en `6.19.3`** (`prisma` y `@prisma/client`) para cerrar la cadena vulnerable `@prisma/config → effect`.
- El lockfile fuerza versiones parcheadas de dependencias transitivas usadas por tooling (`postcss@8.5.15`, `brace-expansion@5.0.6`, `effect@3.21.0`, `defu@6.1.7`).
- Tras instalar dependencias, validar con `npm audit` que el árbol queda en `found 0 vulnerabilities`.
