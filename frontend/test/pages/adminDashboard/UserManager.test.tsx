import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UserManager } from '../../../src/pages/adminDashboard/UserManager';
import * as userApi from '../../../src/api/userApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../../api/userApi', () => ({
  getAllUsers: vi.fn(),
  updateUserRole: vi.fn(),
  deleteUser: vi.fn()
}));

describe('UserManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'fake-token');
  });

  it('pobiera i wyswietla uzytkownikow', async () => {
    vi.spyOn(userApi,"getAllUsers").mockResolvedValue([
      { id: 1, name: 'Jan Kowalski', email: 'jan@test.com', role: 'USER', createdAt: '2026-01-01' }
    ]);

    render(<UserManager />);

    await waitFor(() => {
      expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    });
  });
});