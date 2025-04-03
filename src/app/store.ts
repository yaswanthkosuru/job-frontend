import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import organisationFormReducer from "@/features/Forms/organisationSlice";
import userFormReducer from "@/features/Forms/userFormSlice";
import jobPostingFormReducer from "@/features/Forms/jobPostingFormSlice";
import jobPostingReducer from "@/features/jobposting/jobpostingSlice";
import candidateReducer from "@/features/candidate/CandidateSlice";
import jobApplicantsReducer from "@/features/jobapplicants/jobapplicantslice";
import llmReducer from "@/features/llm/llmslice";
import interviewerReducer from "@/features/interviewer/InterviewerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organisationForm: organisationFormReducer,
    userForm: userFormReducer,
    jobposting: jobPostingFormReducer,
    jobpostingData: jobPostingReducer,
    candidate: candidateReducer,
    jobapplicants: jobApplicantsReducer,
    llm: llmReducer,
    interviewer: interviewerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch;

export default store;
