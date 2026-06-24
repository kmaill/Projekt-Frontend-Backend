import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Navbar } from '../../../src/components/layout/Navbar';
import authReducer from '../../../src/store/authSlice';
import cartReducer from '../../../src/store/cartSlice';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pl',
      changeLanguage: vi.fn(),
    },
  }),
}));

const renderNavbar = (authState: any, cartState: any) => {
  const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
    preloadedState: {
      auth: authState,
      cart: cartState,
    }
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
};

describe('Navbar', () => {
  it('renderuje linki dla goscia', () => {
    renderNavbar(
      { isAuthenticated: false, isCheckingAuth: false, user: null },
      { items: [], total: 0 }
    );
    expect(screen.getByText('nav.offer')).toBeInTheDocument();
    expect(screen.getByText('nav.login')).toBeInTheDocument();
    expect(screen.queryByText('nav.clientPanel')).not.toBeInTheDocument();
  });

  it('renderuje linki dla zalogowanego uzytkownika', () => {
    renderNavbar(
      { isAuthenticated: true, isCheckingAuth: false, user: { id: 1, role: 'USER' } },
      { items: [], total: 0 }
    );
    expect(screen.getByText('nav.clientPanel')).toBeInTheDocument();
    expect(screen.getByText('nav.logout')).toBeInTheDocument();
    expect(screen.queryByText('nav.admin')).not.toBeInTheDocument();
  });

  it('renderuje linki dla admina', () => {
    renderNavbar(
      { isAuthenticated: true, isCheckingAuth: false, user: { id: 2, role: 'ADMIN' } },
      { items: [], total: 0 }
    );
    expect(screen.getByText('nav.admin')).toBeInTheDocument();
  });

  it('pokazuje licznik koszyka', () => {
    renderNavbar(
      { isAuthenticated: false, isCheckingAuth: false, user: null },
      { items: [{ id: '1' }, { id: '2' }], total: 100 }
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 