"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Import necessary icons
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Interviewjobapplicationanalytics } from "@/types/jobApplicantstype";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  getJobApplicationAnalytics,
  useJobApplicationAnalytics,
} from "@/features/jobapplicants/recruiterjobapplicationSlice";

// Sample data remains the sam

export default function InterviewerPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getJobApplicationAnalytics());
  }, []);
  const jobApplicationAnalytics = useJobApplicationAnalytics();
  console.log(jobApplicationAnalytics, "jobApplicationAnalytics");

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      {" "}
      {/* Added more padding */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center md:text-left">
        {" "}
        {/* Increased margin, responsive text */}
        Interview Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {" "}
        {/* Adjusted grid breakpoints, increased gap */}
        {jobApplicationAnalytics.map((position) => (
          <Card
            key={position.id}
            className="hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col"
          >
            {" "}
            {/* Added flex flex-col for equal height button positioning */}
            <CardHeader className="pb-4">
              {" "}
              {/* Adjusted padding */}
              <div className="flex items-start justify-between gap-2 mb-2">
                {/* Added Briefcase Icon next to title */}
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary shrink-0" />
                  <span>{position.title}</span>
                </CardTitle>
                {/* Optional: Could add a status badge here if needed */}
              </div>
              {/* Added Users icon next to application count */}
              <CardDescription className="text-sm text-muted-foreground flex items-center gap-2 pt-1">
                <Users className="w-4 h-4" />
                <span>
                  {position.application_count}{" "}
                  {position.application_count === 1
                    ? "application"
                    : "applications"}{" "}
                  pending interview
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pt-2 pb-4">
              {" "}
              {/* flex-grow pushes footer down, adjusted padding */}
              {/* Optional: Add short description or key requirements here */}
              {/* <p className="text-sm text-muted-foreground mb-4">Brief description or key skill needed...</p> */}
            </CardContent>
            <CardFooter className="pt-4 border-t">
              {" "}
              {/* Added border-top for separation, padding */}
              <div className="flex justify-between items-center w-full">
                {/* Moved Button to Footer for consistent bottom alignment */}
                <Button size="sm" className="w-full justify-between">
                  {" "}
                  {/* Adjusted size */}
                  View Applications
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {/* Display Job ID subtly */}
                {/* <span className="text-xs text-muted-foreground">ID: {position.id}</span> */}
              </div>
            </CardFooter>
          </Card>
        ))}
        {/* Placeholder for adding a new job */}
      </div>
    </div>
  );
}
