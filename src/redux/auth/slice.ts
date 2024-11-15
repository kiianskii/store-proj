import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../helpers/customTypes";
import { logInThunk, logOutThunk } from "./operations";

const initialState: AuthState = {
  user: {
    username: "",
    id: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    selectToken: (state: AuthState) => state.token,
    selectIsLoggedIn: (state: AuthState) => state.isLoggedIn,
    selectIsRefreshing: (state: AuthState) => state.isRefreshing,
    selectUser: (state: AuthState) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { selectIsLoggedIn, selectIsRefreshing, selectToken, selectUser } =
  authSlice.selectors;
