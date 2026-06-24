import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { ClientPanel } from '../../src/pages/ClientPanel';
import authReducer from '../../src/store/authSlice';
import * as companyProfileApi from '../../src/api/companyProfileApi';
import * as reservationApi from '../../src/api/reservationApi';
import * as offerApi from '../../src/api/offerApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../api/companyProfileApi', () => ({
  fetchCompanyProfile: vi.fn(),
  createCompanyProfile: vi.fn()
}));

vi.mock('../api/reservationApi', () => ({
  getAllReservations: vi.fn()
}));

vi.mock('../api/offerApi', () => ({
  fetchWorkspaces: vi.fn()
}));

const renderWithProviders = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { isAuthenticated: true, isCheckingAuth: false, user: { email: 'test@test.com', role: 'USER', id: 1 } }
    }
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ClientPanel />
      </BrowserRouter>
    </Provider>
  );
};

describe('ClientPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Storage.prototype.getItem = vi.fn(() => 'fake-token');
  });

  it('pobiera i wyswietla dane faktury oraz rezerwacje', async () => {
    vi.spyOn(companyProfileApi,"fetchCompanyProfile").mockResolvedValue({
      companyName: 'Test Corp',
      nip: '1234567890',
      address: 'Testowa 1, 00-000 Warszawa',
      contactEmail: 'contact@test.com'
    });

    vi.spyOn(reservationApi,"getAllReservations").mockResolvedValue([
      { id: 1, userId: 1, workspaceId: 10, startTime: '2026-06-25T10:00:00', endTime: '2026-06-25T12:00:00', status: 'CONFIRMED' }
    ]);

    vi.spyOn(offerApi,"fetchWorkspaces").mockResolvedValue([
      { id: 10, name: 'Sala Premium' }
    ]);

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Corp')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
      expect(screen.getByText('Sala Premium')).toBeInTheDocument();
    });
  });
});