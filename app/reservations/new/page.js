import ReservationsNewForm from "./ReservationsNewForm";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

export default function ReservationsNewPage({ searchParams }) {
  const initialRoomId =
    typeof searchParams?.roomId === "string" ? searchParams.roomId : "";
  const portfolioDemo = isPortfolioDemo();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 text-zinc-950">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {portfolioDemo ? "Reservas (demo)" : "Nueva reserva"}
          </h1>
          <p className="mt-2 text-zinc-600">
            {portfolioDemo
              ? "Este despliegue es una demo de portafolio: no se aceptan reservas ni datos personales."
              : "Completa tus datos y confirma disponibilidad."}
          </p>
        </header>

        {portfolioDemo ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
            <p className="font-medium">Modo solo visualización</p>
            <p className="mt-2 text-amber-900/90">
              Explora el catálogo desde la página de inicio o{" "}
              <a className="font-semibold underline" href="/rooms">
                habitaciones
              </a>
              . Las rutas de reserva están deshabilitadas a propósito.
            </p>
          </div>
        ) : (
          <ReservationsNewForm initialRoomId={initialRoomId} />
        )}
      </div>
    </div>
  );
}

