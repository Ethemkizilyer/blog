import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    displayName: "",
    email: "",
    pasword: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action?.payload;
    },
    clearUser: (state, action) => {
      state.user = initialState;
    },
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
