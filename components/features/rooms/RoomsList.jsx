"use client";

import { useRooms } from "@/src/lib/hooks/useRooms";
import CatalogRoomCard from "./CatalogRoomCard";

/**
 * Listado de habitaciones para `/rooms`: fetch compartido vía `useRooms`.
 */
export default function RoomsList() {
  const { rooms, status, errorMessage } = useRooms();

  if (status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-40 animate-pulse rounded-2xl border border-zinc-700 bg-zinc-900"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-700/60 bg-red-950/30 p-4">
        <p className="text-red-200">{errorMessage}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
        <p className="text-zinc-200">No hay habitaciones disponibles por el momento.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <CatalogRoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
