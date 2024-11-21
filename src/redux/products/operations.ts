import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsData } from "../../helpers/customTypes";
import { RootState } from "../store";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (page: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }

    try {
      const { data } = await axios.get<ProductsData>(`/api/products`, {
        params: { page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
