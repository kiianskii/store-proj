import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../helpers/customTypes";
import { setLoggedIn } from "../auth/slice";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (page: number, thunkApi) => {
    try {
      const { data } = await axios.get<Product[]>(`/api/products`, {
        params: { page },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          thunkApi.dispatch(setLoggedIn(false));
        }
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
