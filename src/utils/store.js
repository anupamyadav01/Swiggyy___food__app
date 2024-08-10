import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slices/toggleSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";

const store = configureStore({
  reducer: {
    toggleSlice,
    cartSlice,
    addressSlice
  }
});

export default store;
