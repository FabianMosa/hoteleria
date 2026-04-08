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
      <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">
              Reserva inválida.
            </p>
            <div className="mt-4">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
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
      <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">
              No encontramos esa reserva.
            </p>
            <div className="mt-4">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
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
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reserva confirmada
          </h1>
          <p className="mt-2 text-zinc-600">
            Gracias. Aquí tienes el resumen de tu solicitud.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Habitación
              </dt>
              <dd className="mt-1 font-semibold text-zinc-950">
                {booking.room.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Estado
              </dt>
              <dd className="mt-1 font-semibold text-zinc-950">
                {booking.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Check-in
              </dt>
              <dd className="mt-1 text-zinc-950">
                {formatDate(booking.startDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Check-out
              </dt>
              <dd className="mt-1 text-zinc-950">
                {formatDate(booking.endDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Huésped
              </dt>
              <dd className="mt-1 text-zinc-950">
                {booking.guestName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-zinc-500">
                Email
              </dt>
              <dd className="mt-1 text-zinc-950">
                {booking.guestEmail}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-zinc-600">
              ID de reserva:{" "}
              <span className="font-mono text-zinc-950">{booking.id}</span>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Reservar otra vez
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

