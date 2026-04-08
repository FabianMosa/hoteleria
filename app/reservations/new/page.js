import ReservationsNewForm from "./ReservationsNewForm";

export default function ReservationsNewPage({ searchParams }) {
  const initialRoomId =
    typeof searchParams?.roomId === "string" ? searchParams.roomId : "";

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Nueva reserva
          </h1>
          <p className="mt-2 text-zinc-600">
            Completa tus datos y confirma disponibilidad.
          </p>
        </header>

        <ReservationsNewForm initialRoomId={initialRoomId} />
      </div>
    </div>
  );
}

