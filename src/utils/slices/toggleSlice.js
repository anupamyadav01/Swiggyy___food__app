import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    showLocationToggle: false,
    showDifferentRestaurant: false
  },
  reducers: {
    toggleSearchLocation: (state) => {
      state.showLocationToggle = !state.showLocationToggle;
    },
    toggleDifferentRestaurant: (state) => {
      state.showDifferentRestaurant = !state.showDifferentRestaurant;
    }
  }
});
export const { toggleSearchLocation, toggleDifferentRestaurant } =
  toggleSlice.actions;
export default toggleSlice.reducer;
