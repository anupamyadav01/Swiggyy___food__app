import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "addressSlice",
  initialState: {
    address: ""
  },
  reducers: {
    changeAddress: (state, action) => {
      state.address = action.payload;
    }
  }
});
export const { changeAddress } = addressSlice.actions;
export default addressSlice.reducer;
