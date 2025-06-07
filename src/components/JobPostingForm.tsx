"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SKILLS } from "@/constants";
import { useEffect, useState } from "react";
import { SkillsSelector } from "./SelectSkills";
import {
  UpdateEntireJobPostingForm,
  useJobPostingForm,
} from "@/features/Forms/jobPostingFormSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import TagInput from "./Tagoptionsinput";
import {
  JobPostingFormProps,
  JobPostingFormValues,
  jobPostingSchema,
} from "@/types/jobpostingtype";
const JobPostingForm: React.FC<JobPostingFormProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      department: defaultValues?.department || "",
      description: defaultValues?.description || "",
      responsibilities: defaultValues?.responsibilities || [],
      employment_type: defaultValues?.employment_type || "full_time",
      required_skills: defaultValues?.required_skills || [],
      location: defaultValues?.location || "",
      salary: defaultValues?.salary || "",
      is_active: defaultValues?.is_active || true,
    },
  });

  const handleSubmit = async (data: JobPostingFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error(
        "Failed to " + (isEdit ? "update" : "create") + " job posting"
      );
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    return () => {
      //executes while component unmount to persist data
      const formdata = form.getValues();

      dispatch(
        UpdateEntireJobPostingForm({
          ...formdata,
          status: "idle",
        })
      );
    };
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader className="bg-muted/40 pb-4">
        <CardTitle className="text-2xl font-bold text-primary">
          {isEdit ? "Edit" : "Create"} Job Posting
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          {/* <SkillSelect name="required_skills" control={form.control} /> */}

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Software Engineer"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Department
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Engineering"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Job Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter job description..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Responsibilities
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="employment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Employment Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full_time">Full Time</SelectItem>
                        <SelectItem value="part_time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Bangalore, India"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Salary
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 1200000.00"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <SkillsSelector form={form} />

            {/* <RequiredSkillsField form={form} /> */}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full md:w-auto px-8"
                size="lg"
              >
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : isEdit
                  ? "Update Job Posting"
                  : "Save and Next"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;
