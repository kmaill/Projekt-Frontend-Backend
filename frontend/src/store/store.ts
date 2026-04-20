import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authState';
import cartReducer from './cartState';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
