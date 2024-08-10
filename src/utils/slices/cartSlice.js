import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    restaurantInfo: JSON.parse(localStorage.getItem("restaurantInfo")) || []
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteItem: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      // console.log(newCartItems);
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
    increaseItem: (state, action) => {},
    decreaseItem: (state, action) => {}
  }
});
export const { addToCart, deleteItem, clearCart, increaseItem, decreaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
