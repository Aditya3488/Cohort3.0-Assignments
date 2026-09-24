import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

export const registerEmployee = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      return res.data;
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Response:", error.response);
      console.log("Request:", error.request);
      console.log("Message:", error.message);

      return thunkApi.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const loginEmployee = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const currentLoggedEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);