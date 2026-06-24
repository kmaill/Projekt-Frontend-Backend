import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Home } from './Home';
import authReducer from '../store/authSlice';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithProviders = (ui: React.ReactElement, preloadedState = {}) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Home Component', () => {
  it('renderuje naglowek i linki dla niezalogowanego uzytkownika', () => {
    renderWithProviders(<Home />, {
      auth: { isAuthenticated: false, isCheckingAuth: false, user: null }
    });
    
    expect(screen.getByText('home.title')).toBeInTheDocument();
    expect(screen.getByText('home.checkOffer')).toBeInTheDocument();
    expect(screen.getByText('home.login')).toBeInTheDocument();
  });

  it('nie renderuje linku logowania dla zalogowanego uzytkownika', () => {
    renderWithProviders(<Home />, {
      auth: { isAuthenticated: true, isCheckingAuth: false, user: { id: 1, role: 'USER' } }
    });
    
    expect(screen.queryByText('home.login')).not.toBeInTheDocument();
  });
});