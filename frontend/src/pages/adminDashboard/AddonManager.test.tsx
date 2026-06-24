import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AddonManager } from './AddonManager';
import * as offerApi from '../../api/offerApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../../api/offerApi', () => ({
  fetchAddons: vi.fn(),
  createAddon: vi.fn(),
  updateAddon: vi.fn(),
  deleteAddon: vi.fn()
}));

describe('AddonManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pobiera i wyswietla dodatki', async () => {
    vi.mocked(offerApi.fetchAddons).mockResolvedValue([
      { id: 1, name: 'Projektor 4K', price: 50, billingType: 'PER_RESERVATION' }
    ]);

    render(<AddonManager />);

    await waitFor(() => {
      expect(screen.getByText('Projektor 4K')).toBeInTheDocument();
    });
  });
});