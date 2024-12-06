import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../helpers/customTypes";
import { logInThunk, logOutThunk, refreshThunk } from "./operations";
import {
  addToCartThunk,
  changeQuantityThunk,
  clearCartThunk,
  deleteFromCartThunk,
} from "../products/operations";

const initialState: AuthState = {
  user: {
    username: "",
    id: "",
    email: "",
    cart: [],
  },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  selectors: {
    selectToken: (state: AuthState) => state.token,
    selectIsLoggedIn: (state: AuthState) => state.isLoggedIn,
    selectIsRefreshing: (state: AuthState) => state.isRefreshing,
    selectUser: (state: AuthState) => state.user,
    selectCart: (state: AuthState) => state.user.cart,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOutThunk.pending, () => {
        return initialState;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, { payload }) => {
        state.user.cart = payload.cart.items;
      })
      .addCase(deleteFromCartThunk.fulfilled, (state, { payload }) => {
        state.user.cart = payload.cart.items;
      })
      .addCase(clearCartThunk.fulfilled, (state, { payload }) => {
        state.user.cart = payload.cart.items;
      })
      .addCase(changeQuantityThunk.fulfilled, (state, { payload }) => {
        state.user.cart = payload.cart.items;
      });
  },
});

export const { setLoggedIn } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const {
  selectIsLoggedIn,
  selectCart,
  selectIsRefreshing,
  selectToken,
  selectUser,
} = authSlice.selectors;
