"use client";

import { useEffect, useState } from "react";

/**
 * Carga el listado público de habitaciones desde la API.
 * Encapsula fetch + estado para reutilizar en Home y catálogo (`@frontend`).
 */
export function useRooms() {
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
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setRooms(Array.isArray(data.rooms) ? data.rooms : []);
          setStatus("ready");
        }
      } catch {
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

  return { rooms, status, errorMessage };
}
