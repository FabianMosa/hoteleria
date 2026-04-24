"use client";

import { useMemo, useState } from "react";
import { useRooms } from "@/src/lib/hooks/useRooms";
import { filterRooms } from "@/src/lib/rooms/roomFilters";
import HomeSearchForm from "./HomeSearchForm";
import HomeFilterSidebar from "./HomeFilterSidebar";
import HomeResultsSection from "./HomeResultsSection";

/**
 * Orquestador del home: datos (`useRooms`), filtros (`filterRooms`) y layout responsive.
 */
export default function HomeExplorer() {
  const { rooms, status } = useRooms();

  const [destination, setDestination] = useState("");
  // Fechas vacías hasta que el usuario elija (evita imponer “hoy” en el date picker).
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [minCapacity, setMinCapacity] = useState(1);
  const [typeIndividual, setTypeIndividual] = useState(true);
  const [typeDoble, setTypeDoble] = useState(true);
  const [typeSuite, setTypeSuite] = useState(true);
  const [accessibility, setAccessibility] = useState(false);

  const filteredRooms = useMemo(
    () =>
      filterRooms(rooms, {
        destination,
        // El selector principal de huéspedes también debe reflejarse en el filtro del listado.
        minCapacity: Math.max(Number(minCapacity ?? 1), Number(guests ?? 1)),
        typeIndividual,
        typeDoble,
        typeSuite,
        accessibility,
      }),
    [
      rooms,
      destination,
      minCapacity,
      guests,
      typeIndividual,
      typeDoble,
      typeSuite,
      accessibility,
    ],
  );

  const bookingQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (guests) params.set("guests", String(guests));
    return params.toString();
  }, [startDate, endDate, guests]);

  return (
    <div className="hotel-shell overflow-hidden rounded-3xl ring-1 ring-border-hotel/50">
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
          /* MVP: el filtrado es reactivo; el botón refuerza el patrón de buscador */
        }}
      />

      <div className="h-px bg-border-hotel" />

      <div className="grid gap-6 bg-surface-muted/40 p-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:p-6 lg:grid-cols-[minmax(0,17rem)_1fr]">
        <HomeFilterSidebar
          typeIndividual={typeIndividual}
          onTypeIndividualChange={setTypeIndividual}
          typeDoble={typeDoble}
          onTypeDobleChange={setTypeDoble}
          typeSuite={typeSuite}
          onTypeSuiteChange={setTypeSuite}
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
