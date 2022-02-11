import { createSlice } from "@reduxjs/toolkit";
const initialState = { currency: { label: "USD", symbol: "$" } };
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});
export const currencyActions = currencySlice.actions;
export default currencySlice;
