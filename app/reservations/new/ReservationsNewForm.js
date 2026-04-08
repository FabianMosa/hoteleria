"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservationsNewForm({ initialRoomId }) {
  const router = useRouter();

  const [rooms, setRooms] = useState([]);
  const [roomsStatus, setRoomsStatus] = useState("loading"); // loading | error | ready
  const [roomsError, setRoomsError] = useState(null);

  const [roomId, setRoomId] = useState(initialRoomId);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      setRoomsStatus("loading");
      setRoomsError(null);
      try {
        const res = await fetch("/api/rooms");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const nextRooms = Array.isArray(data.rooms) ? data.rooms : [];
        setRooms(nextRooms);
        setRoomsStatus("ready");

        if (!roomId && nextRooms[0]?.id) {
          setRoomId(nextRooms[0].id);
        }
      } catch (err) {
        if (!cancelled) {
          setRoomsStatus("error");
          setRoomsError("No fue posible cargar el catálogo de habitaciones.");
        }
      }
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(() => {
    return roomId && guestName.trim() && guestEmail.trim() && startDate && endDate;
  }, [roomId, guestName, guestEmail, startDate, endDate]);

  async function onSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!canSubmit) {
      setFormError("Completa todos los campos para continuar.");
      return;
    }

    // Validación básica en UI (más user-friendly; backend hace la validación final).
    const s = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(end.getTime()) || end <= s) {
      setFormError("El rango de fechas no es válido. Revisa el check-in/check-out.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          guestName,
          guestEmail,
          startDate,
          endDate,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Mensajes más amigables para el MVP.
        if (res.status === 409) {
          setFormError(
            "Lo sentimos: la habitación no está disponible para las fechas seleccionadas.",
          );
          return;
        }

        if (res.status === 404) {
          setFormError("La habitación seleccionada ya no existe. Elige otra por favor.");
          return;
        }

        if (res.status === 400) {
          setFormError(data?.error || "Revisa los datos del formulario y vuelve a intentarlo.");
          return;
        }

        setFormError(data?.error || "No fue posible crear la reserva.");
        return;
      }

      const bookingId = data?.booking?.id;
      if (!bookingId) {
        setFormError("La reserva se creó, pero no se pudo obtener el id.");
        return;
      }

      router.push(`/reservations/${encodeURIComponent(bookingId)}`);
    } catch (err) {
      setFormError("Ocurrió un error inesperado. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Habitación
          </label>
          {roomsStatus === "loading" ? (
            <div className="h-10 animate-pulse rounded-lg bg-zinc-100" />
          ) : roomsStatus === "error" ? (
            <div className="text-sm text-red-700">{roomsError}</div>
          ) : (
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-950"
              required
            >
              {rooms.map((room) => (
                <option value={room.id} key={room.id}>
                  {room.name} (Capacidad {room.capacity})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Nombre
          </label>
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Tu nombre"
            className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-950"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="tu@email.com"
            type="email"
            className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-950"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Check-in / Check-out
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-950"
              required
            />
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-950"
              required
            />
          </div>
        </div>
      </div>

      {formError ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">{formError}</p>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "Creando..." : "Confirmar reserva"}
        </button>
      </div>
    </form>
  );
}

