"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

import JobPostingForm from "@/components/JobPostingForm";
import JobPostingFormBuilder from "@/components/JobpostingFormBuilder";
import PreviewForm from "@/components/jobpostingpreviewform";

import {
  selectFormBuilderDefinition,
  setDefinition,
} from "@/features/Forms/jobpostingformbuilderSlice";
import {
  createJobPosting,
  UpdateEntireJobPostingForm,
} from "@/features/Forms/jobPostingFormSlice";

import { JobPostingFormValues } from "@/types";
import { BuilderData, BuilderSchema } from "@/types/jobpostingformbuilder";

const CreateJobPostingUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (data: JobPostingFormValues) => {
    console.log("Submitting Job Posting Data:", data);
    dispatch(
      UpdateEntireJobPostingForm({
        ...data,
        status: "idle", // or another valid status if appropriate
      })
    );
    // await dispatch(createJobPosting(data));
  };

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>Create Job Posting</CardTitle>
        <CardDescription>
          Fill out the details to publish a new job posting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobPostingForm onSubmit={handleSubmit} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Save Posting</Button>
      </CardFooter>
    </Card>
  );
};

const CreateFormBuilderUI = () => {
  const definitionfromselector = selectFormBuilderDefinition();
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<BuilderData>({
    resolver: zodResolver(BuilderSchema),
    defaultValues: {
      fields: [],
    },
  });

  const handleToggle = (checked: boolean) => {
    dispatch(
      setDefinition({
        fields: form.getValues("fields"),
      })
    );
    setTimeout(() => {
      setShowPreview(checked);
    }, 300);
  };

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Form Builder</CardTitle>
          <CardDescription>
            Build a custom job form. Toggle preview before publishing.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-sm text-muted-foreground">
            {showPreview ? "Preview" : "Builder"}
          </span>
          <Switch checked={showPreview} onCheckedChange={handleToggle} />
        </div>
      </CardHeader>
      <CardContent>
        {showPreview ? (
          <PreviewForm definition={{ fields: definitionfromselector.fields }} />
        ) : (
          <JobPostingFormBuilder form={form} />
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={!showPreview}>Save & Publish</Button>
      </CardFooter>
    </Card>
  );
};
export default function JobPostingStepper() {
  const [step, setStep] = useState("posting"); // default to Step 1

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Tabs value={step} onValueChange={setStep} className="space-y-4">
          {/* Optional Progress Bar */}
          {/* <Progress
            value={step === "posting" ? 50 : 100}
            className="h-2 mb-4"
          /> */}

          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="posting">
              Step 1: Create Job Posting
            </TabsTrigger>
            <TabsTrigger value="builder">
              Step 2: Attach Required Forms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posting">
            <CreateJobPostingUI />
          </TabsContent>

          <TabsContent value="builder">
            <CreateFormBuilderUI />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
