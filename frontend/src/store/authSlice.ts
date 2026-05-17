import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: 'USER' | 'ADMIN';
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
      state.user = { email: 'klient@test.com', role: 'USER' };
    },
    loginAsAdmin: (state) => {
      state.isAuthenticated = true;
      state.user = { email: 'admin@test.com', role: 'ADMIN' };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginAsUser, loginAsAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
