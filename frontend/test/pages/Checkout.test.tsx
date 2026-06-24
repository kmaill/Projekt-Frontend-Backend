import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Checkout } from '../../src/pages/Checkout';
import cartReducer from '../../src/store/cartSlice';
import authReducer from '../../src/store/authSlice';
import * as reservationApi from '../../src/api/reservationApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../api/reservationApi', () => ({
  createReservationRequest: vi.fn(),
  addAddonToReservationRequest: vi.fn(),
  createPaymentRequest: vi.fn(),
  createStripeSession: vi.fn()
}));

const renderCheckout = () => {
  const store = configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
    preloadedState: {
      auth: { isAuthenticated: true, isCheckingAuth: false, user: { email: 'test@test.com', role: 'USER', id: 1 } },
      cart: {
        items: [{
          id: '1',
          workspaceId: 1,
          name: 'Sala Testowa',
          pricePerHour: 50,
          date: '2026-06-25',
          startTime: '10:00',
          hours: 2,
          addons: []
        }],
        total: 100
      }
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    </Provider>
  );
};

describe('Checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'fake-token');
  });

  it('renderuje koszyk i pozwala przejsc do platnosci offline', async () => {
    vi.spyOn(reservationApi,"createReservationRequest").mockResolvedValue({ id: 123 });
    vi.spyOn(reservationApi,"createPaymentRequest").mockResolvedValue({ id: 456 });

    renderCheckout();
    expect(screen.getByText('Sala Testowa')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('checkout.bankTransfer'));
    
    await waitFor(() => {
      expect(screen.getByText('payment.offline.title')).toBeInTheDocument();
    });
  });
});