import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { updateUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
