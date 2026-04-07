# Imagen de producción: Next.js (output standalone) + motor Prisma.
# Build: docker build -t TU_USUARIO/hoteleria:latest .
# Run:  docker run -p 3000:3000 -e DATABASE_URL="postgresql://..." TU_USUARIO/hoteleria:latest

FROM node:20-bookworm-slim AS base
WORKDIR /app

# Prisma/OpenSSL en imágenes slim
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
# postinstall ejecuta `prisma generate`: hace falta el schema antes de `npm ci`
COPY prisma ./prisma
# Incluye devDependencies para tener `prisma` en la etapa de build
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next puede no tener `public/` en el repo; el COPY del runner falla si no existe en builder.
RUN mkdir -p public

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Salida standalone de Next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Binarios y cliente Prisma (no siempre quedan trazados en standalone)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Schema por si ejecutas migraciones o db push en un job aparte
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
