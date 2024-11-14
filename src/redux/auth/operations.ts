import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LogCredentials,
  LogResponse,
  RegCredentials,
  RegResponse,
} from "../../helpers/customTypes";

axios.defaults.baseURL = "http://localhost:3000/";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials: RegCredentials, thunkApi) => {
    try {
      const { data } = await axios.post<RegResponse>(
        "/api/auth/register",
        credentials
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const logInThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LogCredentials, thunkApi) => {
    try {
      const { data } = await axios.post<LogResponse>(
        "/api/auth/login",
        credentials
      );
      setToken(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await axios.post("/api/auth/logout");
      clearToken();
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
