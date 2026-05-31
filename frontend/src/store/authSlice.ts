import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  user: {
    email: string;
    role: 'USER' | 'ADMIN';
    id: number;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isCheckingAuth: true,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsUser: (state) => {
      state.isAuthenticated = true;
      state.isCheckingAuth = false;
      state.user = { email: 'klient@test.com', role: 'USER', id: 0 };
    },
    loginAsAdmin: (state) => {
      state.isAuthenticated = true;
      state.isCheckingAuth = false;
      state.user = { email: 'admin@test.com', role: 'ADMIN', id: 0 };
    },
    login: (state, input) => {
      state.isAuthenticated = true;
      state.isCheckingAuth = false;
      state.user = { email: input.payload.email, role: input.payload.role, id: input.payload.id };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isCheckingAuth = false;
      state.user = null;
    },
    setAuthChecked: (state) => {
      state.isCheckingAuth = false;
    },
  },
});

export const { loginAsUser, loginAsAdmin, login, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
