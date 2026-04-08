import { describe, it, expect, vi, beforeEach } from 'vitest';
import prisma from '../prisma';
import { findOverlappingConfirmedBooking } from './availability';

vi.mock('../prisma', () => ({
  default: {
    booking: {
      findFirst: vi.fn(),
    },
  },
}));

describe('findOverlappingConfirmedBooking (Critical Test)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar null si faltan argumentos o son inválidos', async () => {
    const res1 = await findOverlappingConfirmedBooking({ roomId: null, startDate: new Date(), endDate: new Date() });
    const res2 = await findOverlappingConfirmedBooking({ roomId: '1', startDate: '2025-01-01', endDate: new Date() });

    expect(res1).toBeNull();
    expect(res2).toBeNull();
    expect(prisma.booking.findFirst).not.toHaveBeenCalled();
  });

  it('debe retornar la reserva conflictiva si Prisma encuentra un overlap', async () => {
    const mockConflict = { id: 'conflict-1', startDate: new Date('2025-01-10'), endDate: new Date('2025-01-12') };
    prisma.booking.findFirst.mockResolvedValueOnce(mockConflict);

    const result = await findOverlappingConfirmedBooking({
      roomId: 'room1',
      startDate: new Date('2025-01-11'),
      endDate: new Date('2025-01-15')
    });

    expect(result).toEqual(mockConflict);
    expect(prisma.booking.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        roomId: 'room1',
        status: 'CONFIRMED'
      })
    }));
  });

  it('debe retornar null si no hay overlap', async () => {
    prisma.booking.findFirst.mockResolvedValueOnce(null);

    const result = await findOverlappingConfirmedBooking({
      roomId: 'room1',
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-05')
    });

    expect(result).toBeNull();
  });
});
