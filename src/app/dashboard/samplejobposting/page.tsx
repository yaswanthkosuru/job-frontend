"use client";
import React, { useState } from "react";
import JobPostingFormBuilder from "@/components/JobpostingFormBuilder";
import PreviewForm from "@/components/jobpostingpreviewform";
import {
  selectFormBuilderDefinition,
  setDefinition,
} from "@/features/Forms/jobpostingformbuilderSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BuilderData, BuilderSchema } from "@/types/jobpostingformbuilder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

const Page: React.FC = () => {
  const definitionfromselector = selectFormBuilderDefinition();
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<BuilderData>({
    resolver: zodResolver(BuilderSchema),
    defaultValues: {
      fields: [
        {
          name: "job_title",
          label: "Job Title",
          type: "text",
          required: true,
          multiple: false,
          options: [],
        },
        {
          name: "job_description",
          label: "Job Description",
          type: "textarea",
          required: true,
          multiple: false,
          options: [],
        },
        {
          name: "department",
          label: "Department",
          type: "select",
          required: false,
          multiple: false,
          options: ["Engineering", "Marketing", "Sales"],
        },
        {
          name: "skills",
          label: "Skills",
          type: "select",
          required: false,
          multiple: true,
          options: [
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "Django",
            "SQL",
          ],
        },
        {
          name: "remote",
          label: "Remote Option",
          type: "checkbox",
          required: false,
          multiple: false,
          options: [],
        },
        {
          name: "start_date",
          label: "Start Date",
          type: "date",
          required: false,
          multiple: false,
          options: [],
        },
        {
          name: "salary_range",
          label: "Salary Range",
          type: "number",
          required: false,
          multiple: false,
          options: [],
        },
      ],
    },
  });

  const handleToggle = (checked: boolean) => {
    console.log("Toggle Preview:", checked);
    dispatch(
      setDefinition({
        fields: form.getValues("fields"),
      })
    );
    console.log("Definition from selector:", definitionfromselector);

    setTimeout(() => {
      setShowPreview(checked);
    }, 500);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <div className="w-full ">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">Job Posting Builder</CardTitle>
              <span className="text-sm font-medium text-gray-600">
                {showPreview ? "Preview" : "Builder"}
              </span>
            </div>
            <Switch checked={showPreview} onCheckedChange={handleToggle} />
          </CardHeader>

          <CardContent>
            {showPreview ? (
              <PreviewForm
                definition={{ fields: definitionfromselector.fields }}
              />
            ) : (
              <JobPostingFormBuilder form={form} />
            )}
          </CardContent>

          <div className="p-4 flex justify-end">
            <Button
              disabled={!showPreview}
              onClick={() => {
                /* save or publish */
              }}
            >
              Save & Publish
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
