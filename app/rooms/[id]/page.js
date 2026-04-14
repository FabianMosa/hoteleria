import { notFound } from "next/navigation";
import prisma from "../../../src/lib/prisma";
import RoomDetailView from "@/components/features/rooms/RoomDetailView";
import { bookingQueryFromSearchParams } from "@/src/lib/rooms/bookingQueryFromSearchParams";

/**
 * Página de detalle: datos en servidor (Prisma) y UI en `RoomDetailView`.
 */
export async function generateMetadata({ params }) {
  const resolved = await params;
  const id = typeof resolved?.id === "string" ? resolved.id : "";

  if (!id) {
    return { title: "Habitación" };
  }

  const room = await prisma.room.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: room?.name ? `${room.name} · Habitación` : "Habitación",
  };
}

export default async function RoomDetailPage({ params, searchParams }) {
  const resolved = await params;
  const id = typeof resolved?.id === "string" ? resolved.id : "";

  if (!id) {
    notFound();
  }

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
    notFound();
  }

  // Next puede exponer `searchParams` como objeto o como Promise según versión; unificamos con await.
  const resolvedSearch = await Promise.resolve(searchParams);
  const reserveQuery = bookingQueryFromSearchParams(resolvedSearch);

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <RoomDetailView room={room} reserveQuery={reserveQuery} />
    </div>
  );
}
