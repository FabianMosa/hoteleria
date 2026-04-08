import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomeExplorer from './HomeExplorer';

const mockRooms = [
  { id: '1', name: 'Suite Presidential', description: 'Luxury suite', capacity: 4 },
  { id: '2', name: 'Standard Room', description: 'Comfortable', capacity: 2 },
];

describe('HomeExplorer (Basic Component Test)', () => {
  beforeEach(() => {
    // Resetear mocks globales
    vi.resetAllMocks();
    
    // Mock global de fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rooms: mockRooms }),
      })
    );
  });

  it('debe renderizar el título, campos de búsqueda e invocar fetch', async () => {
    render(<HomeExplorer />);
    
    // El texto del título inicial sin resultados ni destino
    expect(screen.getByText('Descubre nuestros hoteles')).toBeInTheDocument();
    
    // Esperamos a que el useEffect termine el fetch y se muestren las rooms
    await waitFor(() => {
      expect(screen.getByText('Suite Presidential')).toBeInTheDocument();
      expect(screen.getByText('Standard Room')).toBeInTheDocument();
    });

    // Validamos que se llamó al endpoint de rooms
    expect(global.fetch).toHaveBeenCalledWith('/api/rooms', expect.any(Object));
  });

  it('debe filtrar habitaciones según el destino', async () => {
    render(<HomeExplorer />);
    
    await waitFor(() => {
      expect(screen.getByText('Suite Presidential')).toBeInTheDocument();
    });

    const destinationInput = screen.getByTestId('destination-input');
    const user = userEvent.setup();
    await user.type(destinationInput, 'Suite');

    // "Standard Room" ya no debería estar
    await waitFor(() => {
      expect(screen.queryByText('Standard Room')).not.toBeInTheDocument();
    });
  });
});
