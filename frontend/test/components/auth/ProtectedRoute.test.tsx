import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ProtectedRoute } from '../../../src/components/auth/ProtectedRoute';
import authReducer from '../../../src/store/authSlice';

const renderWithState = (authState: any, requiredRole?: 'USER' | 'ADMIN') => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: authState }
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>LoginPage</div>} />
          <Route path="/" element={<div>HomePage</div>} />
          <Route element={<ProtectedRoute requiredRole={requiredRole} />}>
            <Route path="/protected" element={<div>ProtectedContent</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ProtectedRoute', () => {
  it('pokazuje ladowanie gdy sprawdza autoryzacje', () => {
    renderWithState({ isAuthenticated: false, isCheckingAuth: true, user: null });
    expect(screen.getByText('Ładowanie')).toBeInTheDocument();
  });

  it('przekierowuje do login gdy nie jest zalogowany', () => {
    renderWithState({ isAuthenticated: false, isCheckingAuth: false, user: null });
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('przekierowuje do home gdy zla rola', () => {
    renderWithState({ isAuthenticated: true, isCheckingAuth: false, user: { role: 'USER' } }, 'ADMIN');
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  it('renderuje content gdy uzytkownik ma uprawnienia', () => {
    renderWithState({ isAuthenticated: true, isCheckingAuth: false, user: { role: 'ADMIN' } }, 'ADMIN');
    expect(screen.getByText('ProtectedContent')).toBeInTheDocument();
  });
});