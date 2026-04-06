const { PrismaClient } = require("@prisma/client");

/**
 * Seed mínimo para habilitar el catálogo y el flujo de reservas.
 * Ejecuta solo cuando no existen habitaciones.
 */
async function main() {
  const prisma = new PrismaClient();

  try {
    const existingCount = await prisma.room.count();
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
        },
        {
          name: "Habitación Doble",
          description: "Dos camas o una cama king (según disponibilidad).",
          capacity: 2,
        },
        {
          name: "Suite",
          description: "Espacio adicional y mayor comodidad.",
          capacity: 3,
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

