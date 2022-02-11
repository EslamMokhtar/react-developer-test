import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: [], total: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const foundItem = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.attribute === action.payload.attribute
      );
      if (foundItem) {
        foundItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },
    addQuantity(state, action) {
      const foundItem = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.attribute === action.payload.attribute
      );
      foundItem.quantity++;
    },
    subQuantity(state, action) {
      const foundItem = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.attribute === action.payload.attribute
      );

      if (foundItem.quantity > 1) {
        foundItem.quantity--;
      } else {
        state.items = state.items.filter((item) => {
          return (
            item.id !== foundItem.id || item.attribute !== foundItem.attribute
          );
        });
      }
    },
    removeProduct(state, action) {
      const foundItem = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.attribute === action.payload.attribute
      );

      state.items = state.items.filter((item) => {
        return (
          item.id !== foundItem.id || item.attribute !== foundItem.attribute
        );
      });
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
