import Link from "next/link";
import prisma from "../../../src/lib/prisma";

function formatDate(dateValue) {
  const d = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-ES");
}

function formatPaymentMethod(method) {
  if (method === "CARD") return "Tarjeta";
  if (method === "TRANSFER") return "Transferencia";
  if (method === "CASH") return "Efectivo";
  return "No especificado";
}

export default async function ReservationConfirmationPage({ params }) {
  const bookingId = params?.id;

  if (typeof bookingId !== "string" || !bookingId) {
    return (
      <div className="flex flex-1 flex-col bg-background text-foreground">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">Solicitud no válida</p>
            <div className="mt-4">
              <Link href="/rooms" className="hotel-btn-secondary">
                Volver al catálogo
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
      <div className="flex flex-1 flex-col bg-background text-foreground">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">
              No encontramos una reserva con ese código.
            </p>
            <div className="mt-4">
              <Link href="/rooms" className="hotel-btn-secondary">
                Ver habitaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Confirmación
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            ¡Listo, {(booking.guestName || "Huésped").trim().split(/\s+/)[0]}!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-hotel sm:text-base">
            Tu estadía quedó registrada. Guardá este resumen o el número de reserva.
          </p>
        </header>

        <section className="hotel-shell rounded-2xl bg-surface p-6 sm:p-8">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Habitación
              </dt>
              <dd className="mt-1 text-base font-semibold text-foreground">
                {booking.room.name}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Estado
              </dt>
              <dd className="mt-1 text-base font-semibold text-foreground">
                {booking.status}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Check-in
              </dt>
              <dd className="mt-1 text-foreground">{formatDate(booking.startDate)}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Check-out
              </dt>
              <dd className="mt-1 text-foreground">{formatDate(booking.endDate)}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Huésped
              </dt>
              <dd className="mt-1 text-foreground">{booking.guestName}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Email
              </dt>
              <dd className="mt-1 break-all text-foreground">{booking.guestEmail}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-hotel">
                Método de pago
              </dt>
              <dd className="mt-1 text-foreground">
                {formatPaymentMethod(booking.paymentMethod)}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-4 border-t border-border-hotel pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-hotel">
              N.º de reserva:{" "}
              <span className="font-mono text-sm font-medium text-foreground">
                {booking.id}
              </span>
            </div>
            <Link href="/rooms" className="hotel-btn-primary w-full sm:w-auto">
              Reservar otra estadía
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
