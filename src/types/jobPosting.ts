import * as z from "zod";
import { CandidateProfile } from "./users";

export const jobPostingSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.string().min(10, "Responsibilities must be at least 10 characters"),
  employment_type: z.enum(["full_time", "part_time", "contract", "internship"], {
    required_error: "Employment type is required",
  }),
  required_skills: z.array(z.string()).min(1, "At least one skill is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary is required"),
  is_active: z.boolean().default(true),
});

export type JobPosting = z.infer<typeof jobPostingSchema>;

export type JobPostingFormValues = JobPosting;

export interface JobPostingFormProps {
  onSubmit: (data: JobPosting) => Promise<void>;
  defaultValues?: Partial<JobPosting>;
  isEdit?: boolean;
}

export interface JobPostingResponse extends JobPosting {
  id: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  email: string;
  phone: string;
  role: string;
  username: string;
}

interface Organisation {
  id: number;
  name: string;
  location: string;
  industry: string;
}

interface Recruiter {
  user: User;
  organisation: Organisation;
}

export interface Skill {
  id: number;
  name: string;
}

export interface JobPostingDetails {
  id: number;
  recruiter: Recruiter;
  skills: Skill[];
  title: string;
  department: string;
  description: string;
  responsibilities: string;
  employment_type: string;
  location: string;
  salary: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface AddCandidate{
  candidate: CandidateProfile
  jobposting:number
}