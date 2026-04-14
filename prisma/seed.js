const { PrismaClient } = require("@prisma/client");

/**
 * Seed mínimo para habilitar el catálogo y el flujo de reservas.
 * Ejecuta solo cuando no existen habitaciones.
 */
async function main() {
  const prisma = new PrismaClient();

  try {
    let existingCount;
    try {
      existingCount = await prisma.room.count();
    } catch (e) {
      // P2021: tabla inexistente — la BD no recibió migraciones (`prisma migrate deploy`).
      if (e?.code === "P2021") {
        console.error(
          "[seed] No existe la tabla Room. Aplica el esquema antes de sembrar datos, por ejemplo:",
        );
        console.error("     npm run db:migrate   # o: npx prisma migrate deploy");
        console.error(
          "     (en desarrollo con BD vacía también sirve: npx prisma migrate dev)",
        );
        process.exit(1);
      }
      throw e;
    }

    if (existingCount > 0) {
      // Importante: no es un error; evita duplicar habitaciones en cada seed.
      console.log(
        `[seed] Omitido: ya hay ${existingCount} habitación(es). Para volver a poblar, vacía la tabla Room o usa otra BD.`,
      );
      return;
    }

    await prisma.room.createMany({
      data: [
        {
          name: "Habitación Individual",
          description: "Cama individual, ideal para estancias cortas.",
          capacity: 1,
          imageUrl:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
        },
        {
          name: "Habitación Doble",
          description: "Dos camas o una cama king (según disponibilidad).",
          capacity: 2,
          imageUrl:
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        },
        {
          name: "Suite",
          description: "Espacio adicional y mayor comodidad.",
          capacity: 3,
          imageUrl:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    });
    console.log("[seed] OK: se insertaron 3 habitaciones de ejemplo.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

