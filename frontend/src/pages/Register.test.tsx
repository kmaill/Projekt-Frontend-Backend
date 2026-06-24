import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Register } from './Register';
import * as userApi from '../api/userApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../api/userApi', () => ({
  register: vi.fn()
}));

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderuje formularz rejestracji', () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByText('registerPage.joinUs')).toBeInTheDocument();
  });

  it('obsluguje blad zajetego adresu email', async () => {
    vi.mocked(userApi.register).mockRejectedValueOnce(new Error('Email exists'));
    render(<BrowserRouter><Register /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('registerPage.fullNamePlaceholder'), { 
      target: { value: 'Test User' } 
    });
    fireEvent.change(screen.getByPlaceholderText('registerPage.emailPlaceholder'), { 
      target: { value: 'test@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('registerPage.passwordPlaceholder'), { 
      target: { value: 'password123' } 
    });
    
    fireEvent.click(screen.getByText('registerPage.createAccountBtn'));

    await waitFor(() => {
      expect(screen.getByText('registerPage.emailExists')).toBeInTheDocument();
    });
  });
});