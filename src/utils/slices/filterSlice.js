import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    filterBtnName: null
  },
  reducers: {
    setFilterData: (state, action) => {
      state.filterBtnName = action.payload;
    }
  }
});

export const { setFilterData } = filterSlice.actions;

export default filterSlice.reducer;
