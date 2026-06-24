import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ReservationManager } from './ReservationManager';
import * as reservationApi from '../../api/reservationApi';
import * as offerApi from '../../api/offerApi';
import * as userApi from '../../api/userApi';

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
    vi.mocked(reservationApi.getAllReservations).mockResolvedValue([
      { id: 1, workspaceId: 10, userId: 1, startTime: '2026-06-25T10:00:00', endTime: '2026-06-25T12:00:00', status: 'CONFIRMED' }
    ]);
    vi.mocked(offerApi.fetchWorkspaces).mockResolvedValue([{ id: 10, name: 'Sala Premium' }]);
    vi.mocked(userApi.getAllUsers).mockResolvedValue([{ id: 1, name: 'Jan', email: 'jan@test.com' }]);

    render(<ReservationManager />);

    await waitFor(() => {
      expect(screen.getByText('Sala Premium')).toBeInTheDocument();
    });
  });
});