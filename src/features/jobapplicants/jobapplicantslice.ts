import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddCandidate } from '@/types/jobPosting';
import axios from 'axios';
import { API_URL } from '@/constants';
import { getAuthHeaders } from '@/constants';
import { renameKeyInNestedObject,setNestedValue } from '@/lib/utils';
import { Application } from '@/types/jobApplicants';
import { RootState } from '../../app/store';
import {toast} from "sonner"
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../app/store';

export const createJobApplication = createAsyncThunk(
  'jobapplicants/createJobApplication',
   async ({jobposting_id,candidate_ids}:{jobposting_id:number,candidate_ids:number[]})=>{
    const dataTopost={
      jobposting_id,
      candidate_ids
    }
    const response = await axios.post(`${API_URL}/api/v1/recruiter/jobapplication/bulk_create/`, dataTopost, getAuthHeaders());
    return response.data;
   }
);

export const UpdateStatusofJobApplication = createAsyncThunk(
  'jobapplicants/UpdateStatusofJobApplication',
   async ({jobapplicant_id,status,additional_notes}:{jobapplicant_id:number,status:string,additional_notes:string})=>{
    const response = await axios.put(`${API_URL}/api/v1/recruiter/jobapplication/${jobapplicant_id}/update_status/`, {status,additional_notes}, getAuthHeaders());
    return response.data;
   }
);

export const getJobApplicants = createAsyncThunk(
  'recruiter/getjobapplicants',
  async () => {
    const response = await axios.get(`${API_URL}/api/v1/recruiter/jobapplication/`, getAuthHeaders());
    return response.data;
  }
);
export interface JobApplicationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  jobapplicants: Application[]|[];
  error: string | null;
}

const initialState: JobApplicationState = {
  status: 'idle',
  jobapplicants: [],
  error: null,
};

const jobApplicantsSlice = createSlice({
  name: 'jobapplicants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Job Application
    builder
      .addCase(createJobApplication.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.success("Candidate added successfully!")
        // state.jobapplicants.push(action.payload);  
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create job application';
        toast.error("Failed to add candidate!")
      })
      // Edit Job Application
      .addCase(UpdateStatusofJobApplication.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(UpdateStatusofJobApplication.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobapplicants = state.jobapplicants.map((app) =>
          app.id === action.payload.id ? { ...app, status: action.payload.status, additional_notes: action.payload.additional_notes  } : app
        );
        toast.success("Candidate updated successfully!")
      })
      .addCase(UpdateStatusofJobApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update job application';
        toast.error("Failed to update candidate!")
      })
      
      // Get Job Applicants
      .addCase(getJobApplicants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getJobApplicants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobapplicants = action.payload;
        toast.success("Job applicants fetched successfully!")
      })
      .addCase(getJobApplicants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch job applicants';
        toast.error("Failed to fetch job applicants!")
      });
  },
});

// Selectors
export const selectJobApplicants = (state: RootState) => state.jobapplicants.jobapplicants;
export const selectJobApplicantsStatus = (state: RootState) => state.jobapplicants.status;
export const selectJobApplicantsError = (state: RootState) => state.jobapplicants.error;

// Custom hook
export const useJobApplicants = () => {
  const jobapplicants = useSelector(selectJobApplicants);
  const status = useSelector(selectJobApplicantsStatus);
  const error = useSelector(selectJobApplicantsError);
  const dispatch = useDispatch<AppDispatch>();

  const fetchApplicants = useCallback(() => {
    dispatch(getJobApplicants());
  }, [dispatch]);

  return {
    jobapplicants,
    status,
    error,
    fetchApplicants,
  };
};

export default jobApplicantsSlice.reducer;