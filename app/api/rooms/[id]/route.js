import prisma from "../../../../src/lib/prisma";

/**
 * Detalle público de una habitación (misma forma que el listado, por id).
 */
export async function GET(_request, { params }) {
  const resolved = await params;
  const id = typeof resolved?.id === "string" ? resolved.id : "";

  if (!id) {
    return Response.json({ error: "Invalid room id" }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        capacity: true,
      },
    });

    if (!room) {
      return Response.json({ error: "Room not found" }, { status: 404 });
    }

    return Response.json({ room });
  } catch {
    return Response.json({ error: "Unable to load room" }, { status: 500 });
  }
}
