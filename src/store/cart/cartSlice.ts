// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.product.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload);

      state.total = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },

    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.product.id === action.payload);

      if (item) {
        item.quantity -= 1;
        // Remove item if quantity becomes 0
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== action.payload);
        }
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  },
});

export const { addItem, removeItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
