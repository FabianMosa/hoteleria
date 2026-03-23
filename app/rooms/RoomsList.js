"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setStatus("loading");
      setErrorMessage(null);
      try {
        const res = await fetch("/api/rooms", { method: "GET" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setRooms(Array.isArray(data.rooms) ? data.rooms : []);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage("No fue posible cargar las habitaciones.");
        }
      }
    }

    loadRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-40 rounded-2xl bg-zinc-900 border border-zinc-700 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-red-700/60 bg-red-950/30 p-4">
        <p className="text-red-200">
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <>
      {rooms.length === 0 ? (
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <p className="text-zinc-200">
            No hay habitaciones disponibles por el momento.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-zinc-50">
                  {room.name}
                </h2>
                <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-100">
                  Capacidad: {room.capacity}
                </span>
              </div>

              {room.description ? (
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {room.description}
                </p>
              ) : null}

              <div className="mt-auto">
                <Link
                  className="inline-flex w-full justify-center rounded-full bg-zinc-100 text-zinc-950 px-4 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors"
                  href={`/reservations/new?roomId=${encodeURIComponent(room.id)}`}
                >
                  Reservar
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

