import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  logInThunk,
  logOutThunk,
  refreshThunk,
  registerThunk,
} from "../auth/operations";
import {
  addToCartThunk,
  clearCartThunk,
  deleteFromCartThunk,
  getProdByCategoryThunk,
  getProductsThunk,
} from "../products/operations";

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          logInThunk.pending,
          refreshThunk.pending,
          logOutThunk.pending,
          registerThunk.pending,
          addToCartThunk.pending,
          deleteFromCartThunk.pending,
          clearCartThunk.pending,
          getProductsThunk.pending,
          getProdByCategoryThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          logInThunk.fulfilled,
          refreshThunk.fulfilled,
          logOutThunk.fulfilled,
          registerThunk.fulfilled,
          addToCartThunk.fulfilled,
          deleteFromCartThunk.fulfilled,
          clearCartThunk.fulfilled,
          getProductsThunk.fulfilled,
          getProdByCategoryThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          logInThunk.rejected,
          refreshThunk.rejected,
          logOutThunk.rejected,
          registerThunk.rejected,
          addToCartThunk.rejected,
          deleteFromCartThunk.rejected,
          clearCartThunk.rejected,
          getProductsThunk.rejected,
          getProdByCategoryThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const loaderReducer = loaderSlice.reducer;
export const { selectIsLoading } = loaderSlice.selectors;
