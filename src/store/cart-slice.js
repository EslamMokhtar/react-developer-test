import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: JSON.parse(localStorage.getItem("items")) || [] };
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
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    addQuantity(state, action) {
      const foundItem = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.attribute === action.payload.attribute
      );
      foundItem.quantity++;
      localStorage.setItem("items", JSON.stringify(state.items));
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
      localStorage.setItem("items", JSON.stringify(state.items));
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
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
