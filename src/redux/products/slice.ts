import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../helpers/customTypes";
import { getProductsThunk } from "./operations";
import { logOutThunk } from "../auth/operations";

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeCurrentPage: (state: ProductsState, action) => {
      state.currentPage = action.payload;
    },
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectCurrentPage: (state: ProductsState) => state.currentPage,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(logOutThunk.fulfilled, () => initialState);
  },
});

export const productsReducer = productsSlice.reducer;

export const { changeCurrentPage } = productsSlice.actions;

export const { selectProducts, selectCurrentPage } = productsSlice.selectors;
