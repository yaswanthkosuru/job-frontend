"use client";

import React, { useEffect, useState } from "react";
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

import JobPostingForm from "@/components/JobPostingForm";
import JobPostingFormBuilder from "@/components/JobpostingFormBuilder";
import UserDetailsJobpostingForm from "@/components/UserDetailsJobpostingForm";

import {
  setformData,
  useFormBuilderFormdata,
} from "@/features/Forms/jobpostingformbuilderSlice";
import {
  createJobPosting,
  UpdateEntireJobPostingForm,
  useJobPostingForm,
} from "@/features/Forms/jobPostingFormSlice";
import { toast } from "sonner";

import {
  FieldType,
  FieldTemplateSchema,
} from "@/types/jobpostingformbuildertype";
import { useRouter } from "next/navigation";
import { JobPostingFormValues } from "@/types/jobpostingtype";

const CreateJobPostingUI = ({
  Setstep,
}: {
  Setstep: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (data: JobPostingFormValues) => {
    console.log("Submitting Job Posting Data:", data);
    dispatch(
      UpdateEntireJobPostingForm({
        ...data,
        status: "idle", // or another valid status if appropriate
      })
    );
    Setstep("builder");
    // await dispatch(createJobPosting(data));
  };
  const values = useJobPostingForm();

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>Create Job Posting</CardTitle>
        <CardDescription>
          Fill out the details to publish a new job posting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobPostingForm onSubmit={handleSubmit} defaultValues={values} />
      </CardContent>
    </Card>
  );
};

const CreateFormBuilderUI = () => {
  const formtemplate = useFormBuilderFormdata();
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<FieldType>({
    resolver: zodResolver(FieldTemplateSchema),
    defaultValues: {
      fields: [
        {
          name: "Email",
          label: "Email",
          type: "text",
          required: true,
        },
        {
          name: "FullName",
          label: "FullName",
          type: "text",
          required: true,
        },
        {
          name: "Resume/cv",
          label: "Resume",
          type: "file",
          required: true,
        },
      ],
    },
  });

  const values = useFormBuilderFormdata();

  useEffect(() => {
    if (values.fields.length > 0) {
      console.log(values, "inside job posting form react");
      const fields = values.fields;
      form.reset({ fields });
    }
  }, [values]);

  const handleToggle = (checked: boolean) => {
    dispatch(
      setformData({
        fields: form.getValues("fields"),
      })
    );
    setTimeout(() => {
      setShowPreview(checked);
    }, 300);
  };
  const router = useRouter();
  const handlesaveandpublish = async () => {
    setLoading(true);
    const result = await dispatch(createJobPosting({}));
    setLoading(false);
    if (createJobPosting.fulfilled.match(result)) {
      toast.success("Job posting created successfully");
      router.push("/dashboard/jobs");
    }
  };

  const jobpostingTitleSection = useJobPostingForm();

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
          <UserDetailsJobpostingForm
            fields={form.getValues("fields")}
            jobpostingHeaderFields={jobpostingTitleSection}
            is_preview={true}
          />
        ) : (
          <JobPostingFormBuilder form={form} />
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handlesaveandpublish}
          disabled={!showPreview || loading}
        >
          {loading ? "Saving..." : "Save & Publish"}
        </Button>
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
            <CreateJobPostingUI Setstep={setStep} />
          </TabsContent>

          <TabsContent value="builder">
            <CreateFormBuilderUI />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
