import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient singleton.
 *
 * En Next.js (dev) los módulos pueden recargarse muchas veces; si creamos un
 * PrismaClient por recarga, agotamos conexiones y el proceso se vuelve inestable.
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__hoteleria_prisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__hoteleria_prisma__ = prisma;
}

export default prisma;

