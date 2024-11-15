import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../helpers/customTypes";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (page: number, thunkApi) => {
    try {
      // Передаємо параметр `page` як частину query string
      const { data } = await axios.get<Product[]>(`/api/products`, {
        params: { page }, // Додаємо параметри запиту
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
