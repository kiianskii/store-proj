import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../helpers/customTypes";
import { getProdByCategoryThunk, getProductsThunk } from "./operations";
import { logOutThunk } from "../auth/operations";

const initialState: ProductsState = {
  products: [],
  categories: [],
  sale: [],
  currentPage: 1,
  searchValue: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeCurrentPage: (state: ProductsState, action) => {
      state.currentPage = action.payload;
    },
    changeSearchValue: (state: ProductsState, action) => {
      state.searchValue = action.payload;
    },
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectSaleProducts: (state: ProductsState) => state.sale,
    selectCategories: (state: ProductsState) => state.categories,
    selectCurrentPage: (state: ProductsState) => state.currentPage,
    selectSearchValue: (state: ProductsState) => state.searchValue,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.sale = payload.sale;
        state.categories = payload.categories;
      })
      .addCase(getProdByCategoryThunk.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.categories = payload.categories;
        state.searchValue = "";
      })
      .addCase(logOutThunk.fulfilled, () => initialState);
  },
});

export const productsReducer = productsSlice.reducer;

export const { changeCurrentPage, changeSearchValue } = productsSlice.actions;

export const {
  selectProducts,
  selectSaleProducts,
  selectCurrentPage,
  selectCategories,
  selectSearchValue,
} = productsSlice.selectors;
