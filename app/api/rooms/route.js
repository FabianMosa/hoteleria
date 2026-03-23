import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { capacity: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        capacity: true,
      },
    });

    return Response.json({ rooms });
  } catch (error) {
    return Response.json(
      { error: "Unable to load rooms" },
      { status: 500 },
    );
  }
}

