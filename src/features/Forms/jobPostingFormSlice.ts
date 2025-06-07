import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { API_URL } from "@/constants";
import axios from "axios";
import {
  JobPostingFormValues,
  JobPostingFormSliceState,
} from "@/types/jobpostingtype";
import { RootState } from "@/app/store";
import { getAuthHeaders } from "@/constants";
import { fetchJobPostings } from "../jobposting/jobpostingSlice";
import { stat } from "fs";
import {
  FieldTemplateSchema,
  FieldType,
} from "@/types/jobpostingformbuildertype";

export const createJobPosting = createAsyncThunk<
  any,
  {},
  { rejectValue: string }
>("jobposting/createJobPosting", async ({}, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    const jobpostingform = state.jobposting;
    const { formData } = state.jobpostingformbuilder;

    const formatdata = {
      ...jobpostingform,
      form_template: FieldTemplateSchema.parse(formData).fields,
      skills: jobpostingform.required_skills || [],
    };

    const response = await axios.post(
      `${API_URL}/api/v1/jobposting/`,
      formatdata,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

export const updateJobPosting = createAsyncThunk(
  "jobposting/updateJobPosting",
  async (
    {
      id,
      jobPostingData,
    }: { id: string; jobPostingData: JobPostingFormValues },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/jobposting/${id}/`,
        jobPostingData,
        getAuthHeaders()
      );
      dispatch(fetchJobPostings());
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const JobPostingFormSlice = createSlice({
  name: "jobposting",
  initialState: {
    title: "",
    department: "",
    description: "",
    responsibilities: [],
    employment_type: "full_time",
    required_skills: [],
    location: "",
    salary: "",
    is_active: true,
    status: "idle",
  } as JobPostingFormSliceState,
  reducers: {
    updateJobPostingForm: (
      state,
      action: PayloadAction<Partial<JobPostingFormSliceState>>
    ) => {
      return { ...state, ...action.payload, status: "idle" };
    },
    UpdateEntireJobPostingForm: (
      state,
      action: PayloadAction<JobPostingFormSliceState>
    ) => {
      console.log("Updating Job Posting Form with:", action.payload);
      return { ...state, ...action.payload, status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobPosting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobPosting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.title = action.payload.title;
        state.department = action.payload.department;
        state.description = action.payload.description;
        state.responsibilities = action.payload.responsibilities;
        state.employment_type = action.payload.employment_type;
        state.required_skills = action.payload.required_skills;
        state.location = action.payload.location;
        state.salary = action.payload.salary;
        state.is_active = action.payload.is_active;
      })
      .addCase(createJobPosting.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateJobPosting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJobPosting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.title = action.payload.title;
        state.department = action.payload.department;
        state.description = action.payload.description;
        state.responsibilities = action.payload.responsibilities;
        state.employment_type = action.payload.employment_type;
        state.required_skills = action.payload.required_skills;
        state.location = action.payload.location;
        state.salary = action.payload.salary;
        state.is_active = action.payload.is_active;
      })
      .addCase(updateJobPosting.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateJobPostingForm, UpdateEntireJobPostingForm } =
  JobPostingFormSlice.actions;
export const useJobPostingForm = () =>
  useSelector(
    (state: RootState) => {
      const form = state.jobposting;
      console.log("Job Posting Form State:", form);
      return form;
    }
    // state.jobPostingForm
  );
export const selectJobPostingForm = (state: RootState) => state.jobposting;

export default JobPostingFormSlice.reducer;
