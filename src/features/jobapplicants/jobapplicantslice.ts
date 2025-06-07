import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddCandidate } from "@/types/jobpostingtype";
import axios from "axios";
import { API_URL } from "@/constants";
import { getAuthHeaders } from "@/constants";
import { renameKeyInNestedObject, setNestedValue } from "@/lib/utils";
import {
  Application,
  Interviewjobapplicationanalytics,
} from "@/types/jobApplicantstype";
import { RootState } from "../../app/store";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { AppDispatch } from "../../app/store";

export interface JobApplicationState {
  status: "idle" | "loading" | "succeeded" | "failed";
  jobapplicants: Application[] | [];
  jobapplicationanalytics: Interviewjobapplicationanalytics[];
  error: string | null;
}

const initialState: JobApplicationState = {
  status: "idle",
  jobapplicants: [],
  jobapplicationanalytics: [],
  error: null,
};
export const createJobApplication = createAsyncThunk(
  "jobapplicants/createJobApplication",
  async ({
    jobposting_id,
    candidate_ids,
  }: {
    jobposting_id: number;
    candidate_ids: number[];
  }) => {
    const dataTopost = {
      jobposting_id,
      candidate_ids,
    };
    const response = await axios.post(
      `${API_URL}/api/v1/recruiter/jobapplication/bulk_create/`,
      dataTopost,
      getAuthHeaders()
    );
    return response.data;
  }
);

export const UpdateStatusofJobApplication = createAsyncThunk(
  "jobapplicants/UpdateStatusofJobApplication",
  async (
    {
      jobapplicant_id,
      status,
      additional_notes,
    }: { jobapplicant_id: number; status: string; additional_notes: string },
    thunkAPI
  ) => {
    const originalState = thunkAPI.getState() as RootState;

    // Optimistically update the state
    thunkAPI.dispatch({
      type: "jobapplicants/optimisticUpdate",
      payload: {
        id: jobapplicant_id,
        status: status as "pending" | "interview" | "rejected" | "accepted",
        additional_notes,
      },
    });

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/recruiter/jobapplication/${jobapplicant_id}/update_status/`,
        { status, additional_notes },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      // Revert the state if API call fails
      thunkAPI.dispatch({
        type: "jobapplicants/rollback",
        payload: originalState.jobapplicants.jobapplicants,
      });
      throw error;
    }
  }
);

export const scheduleInterview = createAsyncThunk(
  "jobapplicants/scheduleInterview",
  async ({
    jobapplicant_id,
    user_id,
  }: {
    jobapplicant_id: number;
    user_id: number;
  }) => {
    const response = await axios.post(
      `${API_URL}/api/v1/recruiter/jobapplication/${jobapplicant_id}/schedule_interview/`,
      { user_id },
      getAuthHeaders()
    );
    console.log(response.data, "schedule interview");
    return response.data;
  }
);

export const getJobApplicationAnalytics = createAsyncThunk(
  "jobapplicants/getJobApplicationAnalytics",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/v1/interviewer/jobapplication/job_application_counts/`;
    try {
      const response = await axios.get<Interviewjobapplicationanalytics[]>(
        url,
        getAuthHeaders()
      );
      console.log(response.data, "interviewers");
      console.log("Interviewers fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching interviewers:", error);
      throw rejectWithValue(error);
    }
  }
);

export const getJobApplicants = createAsyncThunk(
  "recruiter/getjobapplicants",
  async ({ job_id }: { job_id?: number }) => {
    const response = await axios.get(
      `${API_URL}/api/v1/recruiter/jobapplication/?job_id=${job_id}`,
      getAuthHeaders()
    );
    return response.data;
  }
);

const jobApplicantsSlice = createSlice({
  name: "jobapplicants",
  initialState,
  reducers: {
    optimisticUpdate: (state, action) => {
      state.jobapplicants = state.jobapplicants.map((app) =>
        app.id === action.payload.id
          ? {
              ...app,
              status: action.payload.status,
              additional_notes: action.payload.additional_notes,
            }
          : app
      );
    },
    rollback: (state, action) => {
      state.jobapplicants = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create Job Application
    builder
      .addCase(createJobApplication.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Candidate added successfully!");
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to create job application";
        toast.error("Failed to add candidate!");
      })
      // Edit Job Application
      .addCase(UpdateStatusofJobApplication.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(UpdateStatusofJobApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Candidate updated successfully!");
      })
      .addCase(UpdateStatusofJobApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to update job application";
        toast.error("Failed to update candidate!");
      })

      // Get Job Applicants
      .addCase(getJobApplicants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getJobApplicants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobapplicants = action.payload;
        toast.success("Job applicants fetched successfully!");
      })
      .addCase(getJobApplicants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch job applicants";
        toast.error("Failed to fetch job applicants!");
      })
      .addCase(getJobApplicationAnalytics.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getJobApplicationAnalytics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobapplicationanalytics = action.payload;
        toast.success("Job application analytics fetched successfully!");
      })
      .addCase(getJobApplicationAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch job application analytics";
        toast.error("Failed to fetch job application analytics!");
      });
  },
});

// Selectors
export const selectJobApplicants = (state: RootState) =>
  state.jobapplicants.jobapplicants;
export const selectJobApplicantsStatus = (state: RootState) =>
  state.jobapplicants.status;
export const selectJobApplicantsError = (state: RootState) =>
  state.jobapplicants.error;

// Custom hook
export const useJobApplicants = ({ job_id }: { job_id: number }) => {
  const jobapplicants = useSelector(selectJobApplicants);
  const status = useSelector(selectJobApplicantsStatus);
  const error = useSelector(selectJobApplicantsError);
  const dispatch = useDispatch<AppDispatch>();

  const fetchApplicants = useCallback(() => {
    dispatch(getJobApplicants({ job_id }));
  }, [dispatch]);

  return {
    jobapplicants,
    status,
    error,
    fetchApplicants,
  };
};
export const jobApplicationAnalyticsSelector = (state: RootState) =>
  state.jobapplicants.jobapplicationanalytics;
export const useJobApplicationAnalytics = () => {
  const jobapplicants = useSelector(jobApplicationAnalyticsSelector);
  return jobapplicants;
};
export default jobApplicantsSlice.reducer;
