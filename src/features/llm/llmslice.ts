import { API_URL, getAuthHeaders } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface LLMState {
  content: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LLMState = {
  content: null,
  status: 'idle',
  error: null,
};

export const generateAIAnalysis = createAsyncThunk(
  'llm/generateAIAnalysis',
  async ({candidate_id}:{candidate_id:number}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/llm/generatecandidatesummary?candidate_id=${candidate_id}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate AI analysis');
    }
  }
);

const llmSlice = createSlice({
  name: 'llm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateAIAnalysis.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.content = null;
      })
      .addCase(generateAIAnalysis.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.content = action.payload.summary;
      })
      .addCase(generateAIAnalysis.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.content = null;
      });
  },
});

export const selectLLMState = (state: { llm: LLMState }) => state.llm;

export default llmSlice.reducer;