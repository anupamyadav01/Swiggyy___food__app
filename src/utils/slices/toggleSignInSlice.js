import { createSlice } from "@reduxjs/toolkit";

const toggleSignInSlice = createSlice({
  name: "toggleSignInSlice",
  initialState: {
    toggleSignIn: false
  },
  reducers: {
    setToggleSignIn: (state) => {
      state.toggleSignIn = !state.toggleSignIn;
    }
  }
});

export const { setToggleSignIn } = toggleSignInSlice.actions;
export default toggleSignInSlice.reducer;
