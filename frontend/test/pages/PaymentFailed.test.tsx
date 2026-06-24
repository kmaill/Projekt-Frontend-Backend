import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { PaymentFailed } from '../../src/pages/PaymentFailed';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('PaymentFailed', () => {
  it('renderuje ekran bledu', () => {
    render(<BrowserRouter><PaymentFailed /></BrowserRouter>);
    expect(screen.getByText('payment.failed.title')).toBeInTheDocument();
  });
});