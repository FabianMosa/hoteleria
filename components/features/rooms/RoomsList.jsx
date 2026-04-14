"use client";

import { useRooms } from "@/src/lib/hooks/useRooms";
import CatalogRoomCard from "./CatalogRoomCard";

/**
 * Listado de habitaciones para `/rooms`: fetch vía `useRooms`.
 */
export default function RoomsList() {
  const { rooms, status, errorMessage } = useRooms();

  if (status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border-hotel bg-surface-muted"
          >
            <div className="aspect-[4/3] bg-surface sm:aspect-[3/2]" />
            <div className="h-24 p-5">
              <div className="mb-2 h-4 w-2/3 rounded bg-border-hotel" />
              <div className="h-3 w-full rounded bg-border-hotel" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">{errorMessage}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="hotel-shell rounded-2xl p-6">
        <p className="text-sm text-muted-hotel">
          No hay habitaciones publicadas en este momento. Vuelve pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div key={room.id} className="min-h-0 min-w-0">
          <CatalogRoomCard room={room} />
        </div>
      ))}
    </div>
  );
}
