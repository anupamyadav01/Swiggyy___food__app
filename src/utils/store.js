import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slices/toggleSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    toggleSlice,
    cartSlice
  }
});

export default store;
