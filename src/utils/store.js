import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slices/toggleSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";
import filterSlice from "./slices/filterSlice";
import toggleSignInSlice from "./slices/toggleSignInSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    toggleSlice,
    cartSlice,
    addressSlice,
    filterSlice,
    toggleSignInSlice,
    userSlice
  }
});

export default store;
