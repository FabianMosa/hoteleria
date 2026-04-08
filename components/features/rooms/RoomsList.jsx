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
            className="h-40 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">{errorMessage}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-zinc-600">
          No hay habitaciones disponibles por el momento.
        </p>
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
