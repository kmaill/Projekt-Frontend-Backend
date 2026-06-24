import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { Login } from './Login';
import authReducer from '../store/authSlice';
import * as userApi from '../api/userApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../api/userApi', () => ({
  loginRequest: vi.fn()
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderuje formularz logowania', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText('loginPage.welcomeBack')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('loginPage.emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('loginPage.passwordPlaceholder')).toBeInTheDocument();
  });

  it('obsluguje poprawne logowanie', async () => {
    vi.mocked(userApi.loginRequest).mockResolvedValueOnce({ 
      token: 'fake-token', 
      email: 'test@test.com', 
      role: 'USER', 
      id: 1 
    });
    
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText('loginPage.emailPlaceholder'), { 
      target: { value: 'test@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('loginPage.passwordPlaceholder'), { 
      target: { value: 'password123' } 
    });
    
    fireEvent.click(screen.getByText('loginPage.loginBtn'));

    await waitFor(() => {
      expect(userApi.loginRequest).toHaveBeenCalledWith('test@test.com', 'password123');
    });
  });

  it('obsluguje blad logowania', async () => {
    vi.mocked(userApi.loginRequest).mockRejectedValueOnce(new Error('Invalid credentials'));
    renderWithProviders(<Login />);
    
    fireEvent.click(screen.getByText('loginPage.loginBtn'));

    await waitFor(() => {
      expect(screen.getByText('loginPage.invalidCredentials')).toBeInTheDocument();
    });
  });
});