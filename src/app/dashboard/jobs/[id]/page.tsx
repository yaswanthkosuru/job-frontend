"use client";

import { useParams } from "next/navigation";
import { useJobPostingById } from "@/features/jobposting/jobpostingSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchJobPostings } from "@/features/jobposting/jobpostingSlice";
import ApplicationBoard from "@/components/board/kanbanboard";
import {
  Briefcase,
  MapPin,
  IndianRupeeIcon,
  Building,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/constants";
import { recruiterJobApplicant } from "@/types/jobApplicantstype";
import {
  fetchRecruiterjobapplicants,
  useRecruiterJobApplicant,
} from "@/features/jobapplicants/recruiterjobapplicationSlice";
// Generate 100 entries dynamically:
const initialData = Array.from({ length: 100 }, (_, idx) => {
  const id = idx + 1;

  // Base timestamp (ISO string) and interval in ms (10 seconds)
  const baseTs = new Date("2025-06-07T03:45:00Z").getTime();
  const appliedAt = new Date(baseTs + idx * 10_000).toISOString();

  return {
    id,
    user_details: {
      Email: `yaswanth${id}@gmail.com`,
      Gender: "male",
      grades: ["grade 7th", "grade 8th", "grade 9th"],
      Subject: "Maths",
      FullName: "yaswanth",
      referral: "david@learnfluid.com",
      "Date of Birth": "2025-03-23T18:30:00.000Z",
      "Contact Number": "123456789",
      "Currently Working": "yes",
      "Current Designation": "Full stack react python developer",
      "Name of the company": "learnfluid",
      "Highest Educational qualification": "bachelors",
      // …you can add more generic fields here…
    },
    additional_notes: null,
    cover_letter: null,
    status: "pending",
    applied_at: appliedAt,
  };
});

export default function JobPostingPage() {
  const { id } = useParams<{ id: string }>();
  const jobPosting = useJobPostingById(Number(id));
  const dispatch = useDispatch<AppDispatch>();

  // const { status } = useSelector((state: RootState) => state.jobposting);
  // const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    if (!jobPosting) {
      dispatch(fetchJobPostings());
    }
    dispatch(fetchRecruiterjobapplicants({ jobposting_id: id }));
  }, [dispatch, jobPosting]);

  const { recruiterjobapplicationdata, status } = useRecruiterJobApplicant();

  console.log(recruiterjobapplicationdata, "recruiter job application");

  // useEffect(() => {
  //   setIsClient(false);
  // }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-8 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (
    !jobPosting ||
    recruiterjobapplicationdata === undefined ||
    recruiterjobapplicationdata.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-8 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const formatEmploymentType = (type: string) => {
    return type
      ?.replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="min-h-screen  py-8 px-1 sm:px-2 lg:px-2">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8 border-none shadow-md">
          <CardHeader className=" pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">
                {jobPosting?.title}
              </h1>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {jobPosting?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">
                      {jobPosting?.location || "Remote"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IndianRupeeIcon className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Salary</h3>
                    <p className="text-gray-600">
                      {jobPosting?.salary || "Competitive"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Department</h3>
                    <p className="text-gray-600">
                      {jobPosting?.department || "General"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Employment Type
                    </h3>
                    <p className="text-gray-600">
                      {formatEmploymentType(jobPosting?.employment_type) ||
                        "Full-time"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-md p-6">
          <ApplicationBoard initialData={recruiterjobapplicationdata ?? []} />
        </div>
      </div>
    </div>
  );
}
