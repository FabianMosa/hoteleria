"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/** Formatea una fecha local como YYYY-MM-DD para inputs type="date". */
function toDateInputValue(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Formulario de nueva reserva.
 * @param {{ initialRoomId?: string, visualOnly?: boolean }} props
 * — `visualOnly`: modo portafolio; campos deshabilitados y sin POST (solo maquetación).
 */
export default function ReservationsNewForm({ initialRoomId, visualOnly = false }) {
  const router = useRouter();
  const paymentMethodOptions = [
    { value: "CARD", label: "Tarjeta (crédito/débito)" },
    { value: "TRANSFER", label: "Transferencia bancaria" },
    { value: "CASH", label: "Efectivo al check-in" },
  ];

  const [rooms, setRooms] = useState([]);
  const [roomsStatus, setRoomsStatus] = useState("loading"); // loading | error | ready
  const [roomsError, setRoomsError] = useState(null);

  const [roomId, setRoomId] = useState(initialRoomId);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
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
          setRoomsError("No pudimos cargar el catálogo. Intenta de nuevo.");
        }
      }
    }

    loadRooms();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // En vista previa rellenamos fechas y texto de ejemplo (solo maquetación, no son datos del usuario).
  useEffect(() => {
    if (!visualOnly) return;
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 14);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 3);
    setGuestName("Ejemplo Huésped");
    setGuestEmail("ejemplo@correo.com");
    setStartDate(toDateInputValue(checkIn));
    setEndDate(toDateInputValue(checkOut));
  }, [visualOnly]);

  const canSubmit = useMemo(() => {
    if (visualOnly) return false;
    return (
      roomId &&
      guestName.trim() &&
      guestEmail.trim() &&
      paymentMethod &&
      startDate &&
      endDate
    );
  }, [visualOnly, roomId, guestName, guestEmail, paymentMethod, startDate, endDate]);

  async function onSubmit(e) {
    e.preventDefault();
    if (visualOnly) return;
    setFormError(null);

    if (!canSubmit) {
      setFormError("Completa todos los campos obligatorios.");
      return;
    }

    const s = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(end.getTime()) || end <= s) {
      setFormError("La fecha de salida debe ser posterior al check-in.");
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
          paymentMethod,
          startDate,
          endDate,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) {
          setFormError(
            "Esa habitación ya está reservada en parte de esas fechas. Prueba otro rango.",
          );
          return;
        }

        if (res.status === 404) {
          setFormError("La habitación ya no está disponible. Elige otra del listado.");
          return;
        }

        if (res.status === 400) {
          setFormError(data?.error || "Revisa los datos e intenta de nuevo.");
          return;
        }

        setFormError(data?.error || "No pudimos registrar la reserva.");
        return;
      }

      const bookingId = data?.booking?.id;
      if (!bookingId) {
        setFormError("La reserva se registró, pero no obtuvimos el número de confirmación.");
        return;
      }

      router.push(`/reservations/${encodeURIComponent(bookingId)}`);
    } catch (err) {
      setFormError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label={visualOnly ? "Formulario de reserva (solo demostración visual)" : "Formulario de reserva"}
      className="hotel-shell rounded-2xl bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-medium text-foreground" htmlFor="room-select">
            Habitación
          </label>
          {roomsStatus === "loading" ? (
            <div className="h-11 animate-pulse rounded-xl bg-surface-muted" />
          ) : roomsStatus === "error" ? (
            <div className="text-sm text-red-700">{roomsError}</div>
          ) : (
            <select
              id="room-select"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
              required={!visualOnly}
              disabled={visualOnly}
            >
              {rooms.map((room) => (
                <option value={room.id} key={room.id}>
                  {room.name} — hasta {room.capacity} huéspedes
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="guest-name">
            Nombre completo
          </label>
          <input
            id="guest-name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Como figura en la reserva"
            className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
            required={!visualOnly}
            disabled={visualOnly}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="guest-email">
            Correo electrónico
          </label>
          <input
            id="guest-email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            type="email"
            className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
            required={!visualOnly}
            disabled={visualOnly}
          />
        </div>



        <div className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-foreground">Estadía</span>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label className="text-xs text-muted-hotel" htmlFor="check-in">
                Ingreso
              </label>
              <input
                id="check-in"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
                required={!visualOnly}
                disabled={visualOnly}
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs text-muted-hotel" htmlFor="check-out">
                Salida
              </label>
              <input
                id="check-out"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
                required={!visualOnly}
                disabled={visualOnly}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="text-sm font-medium text-foreground" htmlFor="payment-method">
            Método de pago
          </label>
          {/* Selector explícito para registrar la preferencia de pago del huésped en la reserva. */}
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="hotel-input disabled:cursor-not-allowed disabled:opacity-80"
            required={!visualOnly}
            disabled={visualOnly}
          >
            {paymentMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formError ? (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">{formError}</p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={visualOnly || submitting}
          className="hotel-btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {visualOnly
            ? "Vista previa (sin captura de datos. espera implementación de PSP)"
            : submitting
              ? "Confirmando…"
              : "Confirmar reserva (espera implementación de PSP)"}
        </button>
      </div>
    </form>
  );
}
