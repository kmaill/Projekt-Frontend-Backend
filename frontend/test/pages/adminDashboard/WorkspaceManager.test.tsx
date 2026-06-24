import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { WorkspaceManager } from '../../../src/pages/adminDashboard/WorkspaceManager';
import * as offerApi from '../../../src/api/offerApi';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../../api/offerApi', () => ({
  fetchWorkspaces: vi.fn(),
  createWorkspace: vi.fn(),
  updateWorkspace: vi.fn(),
  deleteWorkspace: vi.fn()
}));

describe('WorkspaceManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pobiera i wyswietla przestrzenie', async () => {
    vi.spyOn(offerApi,"fetchWorkspaces").mockResolvedValue([
      { id: 1, name: 'Sala Testowa', type: 'CONFERENCE_ROOM', pricePerHour: 100, capacity: 10, isActive: true }
    ]);

    render(<WorkspaceManager />);

    await waitFor(() => {
      expect(screen.getByText('Sala Testowa')).toBeInTheDocument();
    });
  });

  it('otwiera modal nowej przestrzeni', async () => {
    vi.spyOn(offerApi, "fetchWorkspaces").mockResolvedValue([]);
    render(<WorkspaceManager />);
    
    await waitFor(() => {
        expect(screen.getByText('adminPanel.workspaces.addBtn')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('adminPanel.workspaces.addBtn'));
    
    expect(screen.getByText('adminPanel.workspaces.modal.newTitle')).toBeInTheDocument();
  });
});