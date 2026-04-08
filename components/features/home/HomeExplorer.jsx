"use client";

import { useMemo, useState } from "react";
import { useRooms } from "@/src/lib/hooks/useRooms";
import { filterRooms } from "@/src/lib/rooms/roomFilters";
import { formatISODate } from "@/src/lib/rooms/dateUtils";
import HomeSearchForm from "./HomeSearchForm";
import HomeFilterSidebar from "./HomeFilterSidebar";
import HomeResultsSection from "./HomeResultsSection";

/**
 * Orquestador de la feature Home: datos (`useRooms`) + filtros puros (`filterRooms`) + subcomponentes.
 * Alineado con `ai-team/orchestrator.md`: UI en `@frontend`, dominio remoto en API.
 */
export default function HomeExplorer() {
  const { rooms, status } = useRooms();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(() => formatISODate(new Date()));
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [minCapacity, setMinCapacity] = useState(1);
  const [brandIbis, setBrandIbis] = useState(true);
  const [brandStyles, setBrandStyles] = useState(true);
  const [accessibility, setAccessibility] = useState(false);

  const filteredRooms = useMemo(
    () =>
      filterRooms(rooms, {
        destination,
        minCapacity,
        brandIbis,
        brandStyles,
        accessibility,
      }),
    [rooms, destination, minCapacity, brandIbis, brandStyles, accessibility],
  );

  const bookingQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (guests) params.set("guests", String(guests));
    return params.toString();
  }, [startDate, endDate, guests]);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <HomeSearchForm
        destination={destination}
        onDestinationChange={setDestination}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        guests={guests}
        onGuestsChange={setGuests}
        onSearchClick={() => {
          /* MVP: el filtrado es reactivo; el botón mantiene el patrón UX del buscador */
        }}
      />

      <div className="border-t border-zinc-200" />

      <div className="grid gap-6 p-4 sm:grid-cols-[260px_1fr] sm:p-6">
        <HomeFilterSidebar
          brandIbis={brandIbis}
          onBrandIbisChange={setBrandIbis}
          brandStyles={brandStyles}
          onBrandStylesChange={setBrandStyles}
          minCapacity={minCapacity}
          onMinCapacityChange={setMinCapacity}
          accessibility={accessibility}
          onAccessibilityChange={setAccessibility}
        />

        <HomeResultsSection
          status={status}
          destination={destination}
          rooms={rooms}
          filteredRooms={filteredRooms}
          bookingQuery={bookingQuery}
        />
      </div>
    </div>
  );
}
