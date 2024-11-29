import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CartResponse,
  ProductsData,
  QuantityCredentials,
} from "../../helpers/customTypes";
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

export const getProdByCategoryThunk = createAsyncThunk(
  "products/prodByCategory",
  async (category: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }
    try {
      const { data } = await axios.get<ProductsData>(
        `/api/products/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "products/addToCart",
  async (productId: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }
    try {
      const { data } = await axios.post<CartResponse>(
        `/api/user/cart`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteFromCartThunk = createAsyncThunk(
  "products/deleteFromCart",
  async (productId: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }
    try {
      const { data } = await axios.delete<CartResponse>(
        `/api/user/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "products/clearCart",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }
    try {
      const { data } = await axios.post<CartResponse>(
        `/api/user/cart/all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const changeQuantityThunk = createAsyncThunk(
  "products/changeQuantity",
  async (credentials: QuantityCredentials, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;
    if (!token) {
      return thunkApi.rejectWithValue("Token is missing");
    }
    try {
      const { data } = await axios.post<CartResponse>(
        `/api/user/cart/${credentials.productId}`,
        { quantity: credentials.quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
