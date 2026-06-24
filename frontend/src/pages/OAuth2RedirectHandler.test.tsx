import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { OAuth2RedirectHandler } from './OAuth2RedirectHandler';
import authReducer from '../store/authSlice';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({ sub: 'oauth@test.com', role: 'USER', id: 5 })
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useSearchParams: () => [new URLSearchParams({ token: 'fake-oauth-token' })],
    useNavigate: () => vi.fn(),
  };
});

describe('OAuth2RedirectHandler', () => {
  it('dekoduje token i loguje uzytkownika', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OAuth2RedirectHandler />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.user?.email).toBe('oauth@test.com');
    });
  });
});