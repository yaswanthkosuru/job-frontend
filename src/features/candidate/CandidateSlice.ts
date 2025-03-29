import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateProfile } from '../../types/users';
import axios from 'axios';
import { API_URL } from '@/constants';
import { getAuthHeaders } from '@/constants';
import { useSelector } from 'react-redux';

export const fetchCandidates = createAsyncThunk(
  'candidate/fetchCandidates',
  async (params: { jobposting_id?: number; show_applied?: boolean } = {}) => {
    const queryParams = new URLSearchParams();
    if (params.jobposting_id) {
      queryParams.append('jobposting_id', params.jobposting_id.toString());
    }
    if (params.show_applied !== undefined) {
      queryParams.append('show_applied', params.show_applied.toString());
    }

    const url = `${API_URL}/api/v1/user/candidate/?${queryParams.toString()}`;
    const response = await axios.get<CandidateProfile[]>(url, getAuthHeaders());
    return response.data;
  }
);
    
export const createCandidate = createAsyncThunk(
  'candidate/createCandidate',
  async (candidateData: CandidateProfile) => {
    const { skills, user, ...rest } = candidateData;
    const candidateDataToPost = {
      user: { ...user, password: user.email },
      required_skills: skills || [],
      ...rest,
    };

    const response = await axios.post<CandidateProfile>(`${API_URL}/api/v1/user/candidate/`, candidateDataToPost, getAuthHeaders());
    return response.data;
  }
);

export interface CandidateState {
  candidates: CandidateProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CandidateState = {
  candidates: [],
  status: 'idle',
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createCandidate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.candidates.push(action.payload);
      })
      .addCase(createCandidate.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const useCandidateSelector = () => {
  const { candidates, status } = useSelector((state: { candidate: CandidateState }) => state.candidate);
  return { candidates, status };
};

export default candidateSlice.reducer;