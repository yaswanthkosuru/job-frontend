import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constants";
import { getAuthHeaders } from "@/constants";
import { JobPostingDetails } from "@/types/jobpostingtype";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { recruiterJobApplicant } from "@/types/jobApplicantstype";
export interface JobPostingState {
  jobPostings: JobPostingDetails[];
}

export interface RecruiterJobapplicantSliceState {
  recruiterjobapplicationdata: recruiterJobApplicant[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RecruiterJobapplicantSliceState = {
  status: "idle",
  recruiterjobapplicationdata: [],
};

export const fetchRecruiterjobapplicants = createAsyncThunk(
  "jobposting/fetchrecruiter",
  async ({ jobposting_id }: { jobposting_id: string | number }) => {
    const response = await axios.get<recruiterJobApplicant[]>(
      `${API_URL}/api/v1/recruiter/jobapplication/?jobposting=${jobposting_id}`,
      getAuthHeaders()
    );

    console.log(response.data, "inside slice data recruiter job application");
    return response.data;
  }
);

const recruiterJobApplicantSlice = createSlice({
  name: "jobposting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterjobapplicants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecruiterjobapplicants.fulfilled, (state, action) => {
        state.recruiterjobapplicationdata = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchRecruiterjobapplicants.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const useRecruiterJobApplicant = () => {
  const state = useSelector((state: RootState) => state.recruiterjobapplicant);
  return state;
};

export default recruiterJobApplicantSlice.reducer;
