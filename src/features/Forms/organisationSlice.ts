import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { API_URL } from "@/constants";
import axios from "axios";
import { RootState } from "@/app/store";
import { updateUserForm } from "./userFormSlice";

export interface Orgstate {
  name: string;
  location: string;
  industry: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}
export const createorganisation = createAsyncThunk(
  "organisation/createorganisation",
  async (
    { name, location, industry }: Orgstate,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/organisation/`,
        {
          name,
          location,
          industry,
        }
      );
      const organisation_id = response.data.organisation_id;
      dispatch(updateUserForm({ organisation_id: organisation_id }));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const OrganisationForm = createSlice({
  name: "form",
  initialState: {
    name: "",
    location: "",
    industry: "",
    status: "idle",
  } as Orgstate,
  reducers: {
    updateOrganisationForm: (
      state,
      action: PayloadAction<Partial<Orgstate>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createorganisation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createorganisation.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createorganisation.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateOrganisationForm } = OrganisationForm.actions;
export const useOrganisationForm = () =>
  useSelector((state: RootState) => state.organisationForm);
export default OrganisationForm.reducer;
