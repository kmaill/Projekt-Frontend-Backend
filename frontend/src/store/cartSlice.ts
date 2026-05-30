import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Addon {
  id: string;
  name: string;
  price: number;
  billing_type: 'PER_RESERVATION' | 'PER_HOUR';
}

export interface CartItem {
  id: string;
  workspaceId: number;
  name: string;
  pricePerHour: number;
  date: string;
  startTime: string;
  hours: number;
  addons: Addon[];
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    let itemTotal = item.pricePerHour * item.hours;
    item.addons.forEach(addon => {
      if (addon.billing_type === 'PER_HOUR') {
        itemTotal += addon.price * item.hours;
      } else {
        itemTotal += addon.price;
      }
    });
    return acc + itemTotal;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
