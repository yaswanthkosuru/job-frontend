import { CandidateProfile } from "./users"

export interface Application {
    id: number
    jobposting_id: number
    candidate_id: number
    applied_at: string
    status: "pending" | "interview" | "rejected" | "accepted"
    cover_letter: string | null
    candidate: CandidateProfile
    jobposting: number,
    additional_notes: string | null
  }