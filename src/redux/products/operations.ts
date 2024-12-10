import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CartResponse,
  ProductsData,
  QuantityCredentials,
} from "../../helpers/customTypes";
import { RootState } from "../store";

export const getProductsThunk = createAsyncThunk<
  ProductsData,
  { page: number; value: string },
  { state: RootState }
>("products/getProducts", async ({ page, value }, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("Token is missing");
  }

  try {
    const { data } = await axios.get<ProductsData>(`/api/products`, {
      params: { page, value },
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
});

export const getProdByCategoryThunk = createAsyncThunk<
  ProductsData,
  string,
  { state: RootState }
>("products/prodByCategory", async (category, thunkApi) => {
  const state = thunkApi.getState();
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
});

export const addToCartThunk = createAsyncThunk<
  CartResponse,
  string,
  { state: RootState }
>("products/addToCart", async (productId, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("Token is missing");
  }

  try {
    const { data } = await axios.post<CartResponse>(
      `/api/cart`,
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
});

export const deleteFromCartThunk = createAsyncThunk<
  CartResponse,
  string,
  { state: RootState }
>("products/deleteFromCart", async (productId, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("Token is missing");
  }

  try {
    const { data } = await axios.delete<CartResponse>(
      `/api/cart/${productId}`,
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
});

export const clearCartThunk = createAsyncThunk<
  CartResponse,
  void,
  { state: RootState }
>("products/clearCart", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("Token is missing");
  }

  try {
    const { data } = await axios.post<CartResponse>(
      `/api/cart/all`,
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
});

export const changeQuantityThunk = createAsyncThunk<
  CartResponse,
  QuantityCredentials,
  { state: RootState }
>("products/changeQuantity", async (credentials, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("Token is missing");
  }

  try {
    const { data } = await axios.post<CartResponse>(
      `/api/cart/${credentials.productId}`,
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
});
