import prisma from "../../../src/lib/prisma";
import { findOverlappingConfirmedBooking } from "../../../src/lib/bookings/availability";
import { isPortfolioDemo } from "../../../src/lib/portfolioDemo";

function parseNonEmptyString(value, fieldName) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed;
}

function parseDateOrNull(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  // Validación mínima (MVP).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePaymentMethod(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "CARD" || normalized === "TRANSFER" || normalized === "CASH") {
    return normalized;
  }
  return null;
}

export async function POST(req) {
  try {
    // Portafolio demo: sin creación de reservas (defensa en profundidad).
    if (isPortfolioDemo()) {
      return Response.json(
        {
          error:
            "Modo demostración: las reservas están desactivadas en este despliegue.",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    const roomId = parseNonEmptyString(body.roomId, "roomId");
    const guestName = parseNonEmptyString(body.guestName, "guestName");
    const guestEmail = parseNonEmptyString(body.guestEmail, "guestEmail");
    const paymentMethod = parsePaymentMethod(body.paymentMethod);
    const startDate = parseDateOrNull(body.startDate);
    const endDate = parseDateOrNull(body.endDate);

    if (!roomId || !guestName || !guestEmail || !paymentMethod || !startDate || !endDate) {
      return Response.json(
        { error: "Invalid payload" },
        { status: 400 },
      );
    }

    if (!isValidEmail(guestEmail)) {
      return Response.json(
        { error: "Invalid guestEmail" },
        { status: 400 },
      );
    }

    if (endDate <= startDate) {
      return Response.json(
        { error: "endDate must be after startDate" },
        { status: 400 },
      );
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { id: true, name: true },
    });

    if (!room) {
      return Response.json(
        { error: "Room not found" },
        { status: 404 },
      );
    }

    const overlap = await findOverlappingConfirmedBooking({
      roomId,
      startDate,
      endDate,
    });

    if (overlap) {
      return Response.json(
        {
          error: "Room not available for selected dates",
          conflictBookingId: overlap.id,
        },
        { status: 409 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName,
        guestEmail,
        paymentMethod,
        startDate,
        endDate,
        status: "CONFIRMED",
      },
      select: {
        id: true,
        roomId: true,
        guestName: true,
        guestEmail: true,
        paymentMethod: true,
        startDate: true,
        endDate: true,
        status: true,
        createdAt: true,
      },
    });

    return Response.json(
      {
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    // Mantenemos mensajes simples para el MVP.
    return Response.json(
      { error: "Unable to create booking" },
      { status: 500 },
    );
  }
}

