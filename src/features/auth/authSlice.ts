import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { API_URL } from "@/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

// Define types
export const authSchema = z.object({
  token: z.string().nullable(),
  user: z.object({
    email: z.string(),
    username: z.string().nullable(),
    id:z.number(),
    phone:z.string(),
    role:z.string()
  }).nullable(),
  status: z.enum(["idle", "loading", "succeeded", "failed"]),
  error: z.string().nullable(),
});

export type AuthState = z.infer<typeof authSchema>;

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    email: string;
    username: string | null;
    id:number,
    phone:string
    role:string
  } | null;
}

// Create async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/v1/user/token/`,
        credentials
      );
     const userdetails= await axios.get(
        `${API_URL}/api/v1/user/me`,
        {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        }
      );
      const payload={
        ...response.data,
        user: userdetails.data
      }
      // Store token in localStorage for persistence
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user", JSON.stringify(userdetails.data));
      
      return payload;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState: authSchema.parse({
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    user: null,
    status: "idle",
    error: null,
  }),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = "succeeded";
        state.token = action.payload.access;
        state.user = action.payload.user;
        console.log(state.user,"state user after")
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and selectors
export const { logout, clearAuthError } = authSlice.actions;
export const useAuth = () => useSelector((state: RootState) => state.auth);

export default authSlice.reducer;

