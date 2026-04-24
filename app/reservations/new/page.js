import Link from "next/link";
import ReservationsNewForm from "./ReservationsNewForm";
import { isPortfolioDemo } from "@/src/lib/portfolioDemo";

export default function ReservationsNewPage({ searchParams }) {
  const initialRoomId =
    typeof searchParams?.roomId === "string" ? searchParams.roomId : "";
  const portfolioDemo = isPortfolioDemo();

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {portfolioDemo ? "Modo demo · vista previa" : "Paso único"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Nueva reserva
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-hotel sm:text-base">
            {portfolioDemo
              ? "Modo portafolio: el formulario es solo visual (campos bloqueados, sin envío ni almacenamiento). Así podés mostrar el flujo completo."
              : "Indica habitación, fechas y tus datos. Te llevamos a la confirmación al instante."}
          </p>
        </header>

        {portfolioDemo ? (
          <div className="mb-6 rounded-2xl border border-amber-200/90 bg-amber-50 p-4 text-sm text-amber-950 sm:p-5">
            <p className="font-semibold">Sin captura de datos</p>
            <p className="mt-1.5 leading-relaxed text-amber-900/95">
              Los valores mostrados son de ejemplo. A la espera de implementación de PSP.
            </p>
          </div>
        ) : null}

        <ReservationsNewForm initialRoomId={initialRoomId} visualOnly={portfolioDemo} />
      </div>
    </div>
  );
}
