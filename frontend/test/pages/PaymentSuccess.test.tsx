import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { PaymentSuccess } from '../../src/pages/PaymentSuccess';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as any,
    useSearchParams: () => [new URLSearchParams({ reservation_id: '999' })],
    useNavigate: () => vi.fn(),
  };
});

describe('PaymentSuccess', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ status: 200 });
  });

  it('renderuje ekran sukcesu i wysyla potwierdzenie do API', async () => {
    render(<BrowserRouter><PaymentSuccess /></BrowserRouter>);
    
    expect(screen.getByText('payment.success.title')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/reservations/confirm/999',
        expect.any(Object)
      );
    });
  });
});