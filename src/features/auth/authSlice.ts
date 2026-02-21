import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: User;
      }>
    ) => {
      const { accessToken, refreshToken, user } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    //logout
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
