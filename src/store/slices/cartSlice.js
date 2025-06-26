import { createSlice } from '@reduxjs/toolkit';
import { CART_KEY } from '../constants';
const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: CART_KEY,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;
      const existingItem = state.items.find((ele) => ele.item.id === item.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          item: item,
          restaurant: restaurant,
          count: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const { item } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (ele) => ele.item.id === item.id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, clearCart, removeItem } = cartSlice.actions;
