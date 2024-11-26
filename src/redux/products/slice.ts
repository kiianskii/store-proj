import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../helpers/customTypes";
import { getProdByCategoryThunk, getProductsThunk } from "./operations";
import { logOutThunk } from "../auth/operations";

const initialState: ProductsState = {
  products: [],
  categories: [],
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
    selectCategories: (state: ProductsState) => state.categories,
    selectCurrentPage: (state: ProductsState) => state.currentPage,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.categories = payload.categories;
      })
      .addCase(getProdByCategoryThunk.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.categories = payload.categories;
      })
      .addCase(logOutThunk.fulfilled, () => initialState);
  },
});

export const productsReducer = productsSlice.reducer;

export const { changeCurrentPage } = productsSlice.actions;

export const { selectProducts, selectCurrentPage, selectCategories } =
  productsSlice.selectors;
