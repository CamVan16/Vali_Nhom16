import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartItemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      state.cartItemCount += 1;
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.cartItemCount -= 1;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartItemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
