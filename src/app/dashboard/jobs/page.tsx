"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchJobPostings } from "@/features/jobposting/jobpostingSlice";
import { JobPostingList } from "@/components/jobs/JobPostingList";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const JobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobPostings, status } = useSelector(
    (state: RootState) => state.jobpostingData
  );

  useEffect(() => {
    dispatch(fetchJobPostings());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-screen">
        Failed to load job postings
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Postings</h1>
        <Link
          href="jobs/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/90 text-white rounded-md"
        >
          <PlusCircle size={20} />
          Create Job Posting
        </Link>
      </div>
      <JobPostingList jobs={jobPostings} />
    </div>
  );
};

export default JobsPage;
