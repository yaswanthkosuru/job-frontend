"use client";
import { AppDispatch } from "@/app/store";
import UserDetailsJobpostingForm from "@/components/UserDetailsJobpostingForm";
import {
  fetchJobPostings,
  useJobPostings,
} from "@/features/jobposting/jobpostingSlice";
import { JobPostingFormValues } from "@/types/jobpostingtype";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "@/constants";
import { toast } from "sonner";
const Page = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const jobpostings = useJobPostings();

  const [currentJobPosting, setCurrentJobPosting] = useState<
    (typeof jobpostings)[0] | null
  >(null);

  useEffect(() => {
    dispatch(fetchJobPostings());
  }, [dispatch]);

  useEffect(() => {
    if (jobpostings.length > 0 && id) {
      const job = jobpostings.find(
        (jobposting) => jobposting.id === parseInt(id)
      );
      setCurrentJobPosting(job || null);
    }
  }, [jobpostings, id]);
  console.log(currentJobPosting?.form_template.template, "form template");

  const jobpostingTitleSection: JobPostingFormValues = {
    location: currentJobPosting?.location ?? "",
    title: currentJobPosting?.title ?? "",
    department: currentJobPosting?.department ?? "",
    description: currentJobPosting?.description ?? "",
    responsibilities: Array.isArray(currentJobPosting?.responsibilities)
      ? currentJobPosting?.responsibilities
      : currentJobPosting?.responsibilities
      ? [currentJobPosting.responsibilities]
      : [],
    employment_type:
      currentJobPosting?.employment_type === "full_time" ||
      currentJobPosting?.employment_type === "part_time" ||
      currentJobPosting?.employment_type === "contract" ||
      currentJobPosting?.employment_type === "internship"
        ? currentJobPosting.employment_type
        : "full_time",
    required_skills: currentJobPosting?.skills
      ? currentJobPosting.skills.map((skill: any) =>
          typeof skill === "string" ? skill : skill.name
        )
      : [],
    salary: currentJobPosting?.salary ?? "",
    is_active: currentJobPosting?.is_active ?? false,
  };

  const handlesubmit = async (data: any) => {
    try {
      const newdata = { user_details: { ...data }, jobposting_id: id };

      await axios.post(`${API_URL}/api/v1/candidate/jobapplication/`, newdata);
      toast.success("submitted succesfully");
    } catch (e) {
      toast.error("unable to submit");
    }
  };

  return (
    <div>
      {currentJobPosting ? (
        <UserDetailsJobpostingForm
          jobpostingHeaderFields={jobpostingTitleSection}
          fields={currentJobPosting.form_template.template}
          onSubmit={handlesubmit}
        />
      ) : (
        "Loading job..."
      )}
    </div>
  );
};

export default Page;
