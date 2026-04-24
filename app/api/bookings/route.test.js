import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route.js';
import prisma from '../../../src/lib/prisma';
import { findOverlappingConfirmedBooking } from '../../../src/lib/bookings/availability';

// Mocking dependencies
vi.mock('../../../src/lib/prisma', () => ({
  default: {
    room: {
      findUnique: vi.fn(),
    },
    booking: {
      create: vi.fn(),
    },
  },
}));

vi.mock('../../../src/lib/bookings/availability', () => ({
  findOverlappingConfirmedBooking: vi.fn(),
}));

describe('POST /api/bookings (Medium Test)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_PORTFOLIO_DEMO;
  });

  function createRequest(body) {
    return {
      json: vi.fn().mockResolvedValue(body),
    };
  }

  it('debe fallar (403) en modo portafolio demo', async () => {
    process.env.NEXT_PUBLIC_PORTFOLIO_DEMO = 'true';

    const req = createRequest({
      roomId: '123',
      guestName: 'Juan',
      guestEmail: 'juan@test.com',
      paymentMethod: 'CARD',
      startDate: '2026-01-01',
      endDate: '2026-01-05',
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toMatch(/demostración/i);
  });

  it('debe fallar (400) si faltan datos requeridos', async () => {
    const req = createRequest({ roomId: '123' }); // faltan fechas y emails
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Invalid payload');
  });

  it('debe fallar (400) si el email es inválido', async () => {
    const req = createRequest({ 
      roomId: '123', guestName: 'Juan', guestEmail: 'invalid-email',
      paymentMethod: 'CARD',
      startDate: '2025-01-01', endDate: '2025-01-05'
    });
    
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(400);
    expect(json.error).toBe('Invalid guestEmail');
  });

  it('debe fallar (404) si la habitación no existe', async () => {
    prisma.room.findUnique.mockResolvedValueOnce(null);

    const req = createRequest({ 
      roomId: 'no-exist', guestName: 'Juan', guestEmail: 'juan@test.com',
      paymentMethod: 'CARD',
      startDate: '2025-01-01', endDate: '2025-01-05'
    });
    
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(404);
    expect(json.error).toBe('Room not found');
  });

  it('debe fallar (409) si hay overlap', async () => {
    prisma.room.findUnique.mockResolvedValueOnce({ id: '123', name: 'Suite' });
    findOverlappingConfirmedBooking.mockResolvedValueOnce({ id: 'overlap-1' });

    const req = createRequest({ 
      roomId: '123', guestName: 'Juan', guestEmail: 'juan@test.com',
      paymentMethod: 'CARD',
      startDate: '2025-01-01', endDate: '2025-01-05'
    });
    
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(409);
    expect(json.error).toBe('Room not available for selected dates');
  });

  it('debe crear reserva (201) si está disponible', async () => {
    prisma.room.findUnique.mockResolvedValueOnce({ id: '123', name: 'Suite' });
    findOverlappingConfirmedBooking.mockResolvedValueOnce(null);
    prisma.booking.create.mockResolvedValueOnce({ id: 'booking-1', status: 'CONFIRMED', paymentMethod: 'CARD' });

    const req = createRequest({ 
      roomId: '123', guestName: 'Juan', guestEmail: 'juan@test.com',
      paymentMethod: 'CARD',
      startDate: '2025-01-01', endDate: '2025-01-05'
    });
    
    const res = await POST(req);
    const json = await res.json();
    
    expect(res.status).toBe(201);
    expect(json.booking.id).toBe('booking-1');
  });

  it('debe fallar (400) si el método de pago no es válido', async () => {
    const req = createRequest({
      roomId: '123',
      guestName: 'Juan',
      guestEmail: 'juan@test.com',
      paymentMethod: 'paypal',
      startDate: '2025-01-01',
      endDate: '2025-01-05',
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('Invalid payload');
  });
});
