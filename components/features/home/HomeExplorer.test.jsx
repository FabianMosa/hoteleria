import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomeExplorer from "./HomeExplorer";

const mockRooms = [
  { id: "1", name: "Suite Presidential", description: "Luxury suite", capacity: 4 },
  { id: "2", name: "Standard Room", description: "Comfortable", capacity: 2 },
];

describe("HomeExplorer (Basic Component Test)", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rooms: mockRooms }),
      }),
    );
  });

  it("debe renderizar el título, campos de búsqueda e invocar fetch", async () => {
    render(<HomeExplorer />);

    expect(screen.getByText("Nuestras habitaciones")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Suite Presidential")).toBeInTheDocument();
      expect(screen.getByText("Standard Room")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/rooms", expect.any(Object));
  });

  it("el destino debe ser fijo según requerimiento de negocio", async () => {
    render(<HomeExplorer />);

    await waitFor(() => {
      expect(screen.getByText("Suite Presidential")).toBeInTheDocument();
    });

    const destinationInput = screen.getByTestId("destination-input");
    expect(destinationInput).toHaveAttribute("readonly");
    expect(destinationInput).toHaveValue("Ciudad");
  });

  it("debe filtrar habitaciones según la cantidad de huéspedes", async () => {
    render(<HomeExplorer />);

    await waitFor(() => {
      expect(screen.getByText("Suite Presidential")).toBeInTheDocument();
      expect(screen.getByText("Standard Room")).toBeInTheDocument();
    });

    const guestsSelect = screen.getByTestId("guests-select");
    const user = userEvent.setup();
    await user.selectOptions(guestsSelect, "3");

    await waitFor(() => {
      expect(screen.queryByText("Standard Room")).not.toBeInTheDocument();
      expect(screen.getByText("Suite Presidential")).toBeInTheDocument();
    });
  });
});
