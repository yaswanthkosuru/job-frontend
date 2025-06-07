import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constants";
import { getAuthHeaders } from "@/constants";
import { JobPostingDetails } from "@/types/jobpostingtype";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const fetchJobPostings = createAsyncThunk(
  "jobposting/fetchJobPostings",
  async () => {
    const response = await axios.get<JobPostingDetails[]>(
      `${API_URL}/api/v1/jobposting/`,
      getAuthHeaders()
    );
    return response.data;
  }
);

export interface JobPostingState {
  jobPostings: JobPostingDetails[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: JobPostingState = {
  jobPostings: [],
  status: "idle",
};

const jobPostingSlice = createSlice({
  name: "jobposting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPostings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobPostings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobPostings = action.payload;
      })
      .addCase(fetchJobPostings.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const useJobPostingById = (id: number) => {
  const state = useSelector((state: RootState) => state.jobpostingData);
  return state.jobPostings.find((jobposting) => jobposting.id === id);
};

export const useJobPostings = () => {
  const state = useSelector((state: RootState) => state.jobpostingData);
  return state.jobPostings;
};

export default jobPostingSlice.reducer;
