import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InterviewerProfile } from '../../types/users';
import axios from 'axios';
import { API_URL } from '@/constants';
import { getAuthHeaders } from '@/constants';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Interviewjobapplicationanalytics } from '@/types/jobApplicants';



export interface InterviewerState {
  interviewers: InterviewerProfile[];

  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InterviewerState = {
  interviewers: [],
  status: 'idle',
};

export const fetchInterviewers = createAsyncThunk(
  'interviewer/fetchInterviewers',
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/v1/user/interviewer/`;
    try {
      const response = await axios.get<InterviewerProfile[]>(url, getAuthHeaders());
      console.log(response.data, "interviewers");
      console.log("Interviewers fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching interviewers:", error);
      throw rejectWithValue(error);
    }
  }
);


export const createInterviewer = createAsyncThunk(
  'interviewer/createInterviewer',
  async (interviewerData: InterviewerProfile) => {
    const response = await axios.post<InterviewerProfile>(`${API_URL}/api/v1/user/interviewer/`, interviewerData, getAuthHeaders());
    return response.data;
  }
);



const interviewerSlice = createSlice({
  name: 'interviewer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviewers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInterviewers.fulfilled, (state, action) => {
        console.log("Interview fetched full filled", action.payload);
        state.status = 'succeeded';
        toast.success("Interviewers fetched successfully");
        state.interviewers = action.payload;
      })
      .addCase(fetchInterviewers.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Failed to fetch interviewers");
      })
      .addCase(createInterviewer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createInterviewer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.success("Interviewer added successfully");
        state.interviewers.push(action.payload);
      })
      .addCase(createInterviewer.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Failed to add interviewer");
      });
  },
});

export const { reducer: interviewerReducer } = interviewerSlice;

export const useInterviewerSelector = () => {
  const interviewerData = useSelector((state: { interviewer: InterviewerState }) => state.interviewer);
  return interviewerData;
};

export default interviewerReducer;
