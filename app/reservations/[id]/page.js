import Link from "next/link";
import prisma from "../../../src/lib/prisma";

function formatDate(dateValue) {
  const d = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-ES");
}

export default async function ReservationConfirmationPage({ params }) {
  const bookingId = params?.id;

  if (typeof bookingId !== "string" || !bookingId) {
    return (
      <div className="flex flex-col flex-1 bg-zinc-950 text-zinc-100">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl border border-red-700/60 bg-red-950/30 p-6">
            <p className="text-red-200 font-medium">
              Reserva inválida.
            </p>
            <div className="mt-4">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center rounded-full border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                Volver a habitaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      room: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!booking) {
    return (
      <div className="flex flex-col flex-1 bg-zinc-950 text-zinc-100">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl border border-red-700/60 bg-red-950/30 p-6">
            <p className="text-red-200 font-medium">
              No encontramos esa reserva.
            </p>
            <div className="mt-4">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center rounded-full border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                Volver a habitaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            Reserva confirmada
          </h1>
          <p className="mt-2 text-zinc-200">
            Gracias. Aquí tienes el resumen de tu solicitud.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Habitación
              </dt>
              <dd className="mt-1 text-zinc-50 font-semibold">
                {booking.room.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Estado
              </dt>
              <dd className="mt-1 text-zinc-50 font-semibold">
                {booking.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Check-in
              </dt>
              <dd className="mt-1 text-zinc-50">
                {formatDate(booking.startDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Check-out
              </dt>
              <dd className="mt-1 text-zinc-50">
                {formatDate(booking.endDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Huésped
              </dt>
              <dd className="mt-1 text-zinc-50">
                {booking.guestName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-300">
                Email
              </dt>
              <dd className="mt-1 text-zinc-50">
                {booking.guestEmail}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-300">
              ID de reserva:{" "}
              <span className="font-mono">{booking.id}</span>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center rounded-full bg-zinc-100 text-zinc-950 px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Reservar otra vez
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

