import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { items: [], total: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], total: 0 };
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartState()
  }
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().cart);
    localStorage.setItem('cartState', serializedState);
  } catch {
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;