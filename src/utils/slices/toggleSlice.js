import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    showLocationToggle: false
  },
  reducers: {
    toggleSearchLocation: (state) => {
      state.showLocationToggle = !state.showLocationToggle;
    }
  }
});
export const { toggleSearchLocation } = toggleSlice.actions;
export default toggleSlice.reducer;
