import { CandidateProfile } from "./userstype";

export interface Application {
  id: number;
  jobposting_id: number;
  candidate_id: number;
  applied_at: string;
  status: "pending" | "interview" | "rejected" | "accepted";
  cover_letter: string | null;
  candidate: CandidateProfile;
  jobposting: number;
  additional_notes: string | null;
}

export interface Interviewjobapplicationanalytics {
  id: number;
  title: string;
  application_count: number;
}
export type recruiterJobApplicant = {
  id: number | string;
  user_details: Record<string, any>;
  applied_at: string;
  status: string;
  additional_notes: string | null;
  cover_letter: string | null;
};
