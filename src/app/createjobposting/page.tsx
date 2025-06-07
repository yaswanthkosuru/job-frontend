"use client";

import JobPostingForm from "@/components/JobPostingForm";
import Navbar from "@/components/Navbar";
import { JobPosting } from "@/types/jobpostingtype";
import React from "react";
import { useDispatch } from "react-redux";
import { createJobPosting } from "@/features/Forms/jobPostingFormSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppDispatch } from "@/app/store";

const JobPostingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (data: JobPosting) => {
    try {
      const result = await dispatch(createJobPosting(data));
      if (createJobPosting.fulfilled.match(result)) {
        toast.success("Job posting created successfully");
        router.push("/dashboard/jobs");
      }
    } catch (error) {
      toast.error("Failed to create job posting");
    }
  };

  const handleLaterClick = () => {
    router.push("/dashboard/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <div className="flex px-12 mt-2 font-medium items-center justify-end">
          <button
            onClick={handleLaterClick}
            className="text-sm text-blue-500 underline cursor-pointer hover:cursor-pointer"
          >
            I will do it later
          </button>
        </div>
        <JobPostingForm onSubmit={handleSubmit} isEdit={false} />
      </div>
    </div>
  );
};

export default JobPostingPage;
