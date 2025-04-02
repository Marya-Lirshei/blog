import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFormData } from "../../types/types";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../../components/Api/authApi"; // Объединила API в один файл

export const login = createAsyncThunk(
  "auth/login",
  async (userData: IFormData, { rejectWithValue }) => {
    try {
      const token = await loginUser(userData);
      return token;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: IFormData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data.user.token;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getProfile();
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData: Partial<IFormData>, { rejectWithValue }) => {
    try {
      const user = await updateProfile(userData);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    user: null as {
      username: string;
      email: string;
      image: string;
      password: string;
    } | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
