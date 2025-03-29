import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { API_URL } from "@/constants";
import axios from "axios";

export interface userFormState {
  username: string;
  email: string;
  password: string;
  phone: string;
  organisation_id: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const createuser = createAsyncThunk(
  "user/createuser",
  async ({ username, email, password, phone, organisation_id }: userFormState, { rejectWithValue }) => {
    try {
      const role = "recruiter"; // Default role
      const response = await axios.post(`${API_URL}/api/v1/user/recruiter/`, {
        username,
        email,
        role,
        password,
        phone,
        organisation_id,
      });
      console.log(response.data, "response");
      return response.data;
    } catch (error: unknown) {
      console.log(error, "error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
// Redux Slice
const formSlice = createSlice({
  name: "form",
  initialState: {
    username: "",
    email: "",
    role: "recruiter",
    password: "",
    phone: "",
    organisation_id: 0,
    status: "idle",
  },
  reducers: {
    updateUserForm: (state, action: PayloadAction<Partial<userFormState>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createuser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createuser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateUserForm } = formSlice.actions;
export const useUserForm = () =>
  useSelector((state: RootState) => state.userForm);
export default formSlice.reducer;
