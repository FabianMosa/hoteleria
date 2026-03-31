import prisma from "../prisma";

/**
 * Encuentra una reserva CONFIRMED que se solape con el rango solicitado.
 *
 * Regla de solapamiento:
 * - existe solape si startA < endB && endA > startB
 */
export async function findOverlappingConfirmedBooking({ roomId, startDate, endDate }) {
  if (!roomId || !(startDate instanceof Date) || !(endDate instanceof Date)) {
    return null;
  }

  return prisma.booking.findFirst({
    where: {
      roomId,
      status: "CONFIRMED",
      startDate: { lt: endDate },
      endDate: { gt: startDate },
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });
}

