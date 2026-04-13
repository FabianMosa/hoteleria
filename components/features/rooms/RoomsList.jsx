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
            className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
          >
            <div className="aspect-[4/3] bg-zinc-200 sm:aspect-[3/2]" />
            <div className="h-24 p-5">
              <div className="mb-2 h-4 w-2/3 rounded bg-zinc-200" />
              <div className="h-3 w-full rounded bg-zinc-200" />
            </div>
          </div>
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
