import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ReservationManager } from '../../../src/pages/adminDashboard/ReservationManager';
import * as reservationApi from '../../../src/api/reservationApi';
import * as offerApi from '../../../src/api/offerApi';
import * as userApi from '../../../src/api/userApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../../api/reservationApi', () => ({
  getAllReservations: vi.fn(),
  deleteReservation: vi.fn()
}));
vi.mock('../../api/offerApi', () => ({
  fetchWorkspaces: vi.fn()
}));
vi.mock('../../api/userApi', () => ({
  getAllUsers: vi.fn()
}));

describe('ReservationManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'fake-token');
  });

  it('pobiera i wyswietla rezerwacje', async () => {
    vi.spyOn(reservationApi,"getAllReservations").mockResolvedValue([
      { id: 1, workspaceId: 10, userId: 1, startTime: '2026-06-25T10:00:00', endTime: '2026-06-25T12:00:00', status: 'CONFIRMED' }
    ]);
    vi.spyOn(offerApi,"fetchWorkspaces").mockResolvedValue([{ id: 10, name: 'Sala Premium' }]);
    vi.spyOn(userApi,"getAllUsers").mockResolvedValue([{ id: 1, name: 'Jan', email: 'jan@test.com' }]);

    render(<ReservationManager />);

    await waitFor(() => {
      expect(screen.getByText('Sala Premium')).toBeInTheDocument();
    });
  });
});