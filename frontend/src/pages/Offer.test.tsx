import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Offer } from './Offer';
import cartReducer from '../store/cartSlice';
import * as offerApi from '../api/offerApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../api/offerApi', () => ({
  fetchWorkspaces: vi.fn(),
  fetchAddons: vi.fn()
}));

const renderOffer = () => {
  const store = configureStore({
    reducer: { cart: cartReducer }
  });
  return render(
    <Provider store={store}>
      <Offer />
    </Provider>
  );
};

describe('Offer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pobiera i wyswietla oferty', async () => {
    vi.mocked(offerApi.fetchWorkspaces).mockResolvedValue([
      { id: 1, name: 'Biurko A', type: 'DESK', pricePerHour: 20, capacity: 1, isActive: true }
    ]);
    vi.mocked(offerApi.fetchAddons).mockResolvedValue([]);

    renderOffer();

    await waitFor(() => {
      expect(screen.getByText('Biurko A')).toBeInTheDocument();
    });
  });
});