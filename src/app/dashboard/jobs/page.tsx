"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchJobPostings } from "@/features/jobposting/jobpostingSlice";
import { JobPostingList } from "@/components/jobs/JobPostingList";
import { CreateJobPostingDialog } from "@/components/jobs/CreateJobPostingDialog";

const JobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobPostings, status } = useSelector((state: RootState) => state.jobpostingData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobPostings());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="flex items-center justify-center h-screen">Failed to load job postings</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Postings</h1>
        <CreateJobPostingDialog />
      </div>
      <JobPostingList jobs={jobPostings} />
    </div>
  );
};

export default JobsPage;
