import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LogCredentials,
  LogResponse,
  RegCredentials,
  RegResponse,
} from "../../helpers/customTypes";
import { RootState } from "../store";

axios.defaults.baseURL = "https://store-proj-back.onrender.com/";

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
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      if (!token) {
        throw new Error("Token is missing");
      }
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);
