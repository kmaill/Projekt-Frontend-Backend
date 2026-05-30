import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: 'USER' | 'ADMIN';
    id: number;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsUser: (state) => {
      state.isAuthenticated = true;
      state.user = { email: 'klient@test.com', role: 'USER', id: 0 };
    },
    loginAsAdmin: (state) => {
      state.isAuthenticated = true;
      state.user = { email: 'admin@test.com', role: 'ADMIN', id: 0 };
    },
    login: (state, input) => {
      state.isAuthenticated = true;
      state.user = { email: input.payload.email, role: input.payload.role, id: input.payload.id };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginAsUser, loginAsAdmin, login, logout } = authSlice.actions;
export default authSlice.reducer;
