import ReservationsNewForm from "./ReservationsNewForm";

export default function ReservationsNewPage({ searchParams }) {
  const initialRoomId =
    typeof searchParams?.roomId === "string" ? searchParams.roomId : "";

  return (
    <div className="flex flex-col flex-1 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            Nueva reserva
          </h1>
          <p className="mt-2 text-zinc-200">
            Completa tus datos y confirma disponibilidad.
          </p>
        </header>

        <ReservationsNewForm initialRoomId={initialRoomId} />
      </div>
    </div>
  );
}

