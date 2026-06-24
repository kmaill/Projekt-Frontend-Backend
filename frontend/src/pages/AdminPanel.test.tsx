import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { AdminPanel } from './AdminPanel';
import authReducer from '../store/authSlice';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('./adminDashboard/WorkspaceManager', () => ({ WorkspaceManager: () => <div>WorkspaceManagerMock</div> }));
vi.mock('./adminDashboard/UserManager', () => ({ UserManager: () => <div>UserManagerMock</div> }));

const renderAdminPanel = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { isAuthenticated: true, isCheckingAuth: false, user: { email: 'admin@test.com', role: 'ADMIN', id: 2 } }
    }
  });
  return render(<Provider store={store}><AdminPanel /></Provider>);
};

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('przelacza na WorkspaceManager', () => {
    renderAdminPanel();
    fireEvent.click(screen.getByText('adminPanel.dashboard.workspaces.btn'));
    expect(screen.getByText('WorkspaceManagerMock')).toBeInTheDocument();
  });

  it('przelacza na UserManager', () => {
    renderAdminPanel();
    fireEvent.click(screen.getByText('adminPanel.dashboard.users.btn'));
    expect(screen.getByText('UserManagerMock')).toBeInTheDocument();
  });
});