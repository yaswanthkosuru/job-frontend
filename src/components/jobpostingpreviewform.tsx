"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import JobPostingTitleSection from "./joppostingFormTitle";

// Schema
const FieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum([
    "text",
    "textarea",
    "checkbox",
    "select",
    "radio",
    "number",
    "date",
    "file",
  ]),
  required: z.boolean(),
  multiple: z.boolean().optional(),
  options: z.array(z.string()).optional(),
});

const BuilderSchema = z.object({
  fields: z.array(FieldSchema),
});

type BuilderData = z.infer<typeof BuilderSchema>;

type PreviewFormProps = {
  definition: BuilderData;
};

export default function PreviewForm({ definition }: PreviewFormProps) {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-gray-800">Preview Form</h2>

      <JobPostingTitleSection />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {definition.fields.map((field, idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={field.name}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    {(() => {
                      switch (field.type) {
                        case "text":
                        case "number":
                          return (
                            <Input
                              type={field.type}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className="w-full rounded-md "
                              {...f}
                            />
                          );

                        case "file":
                          return (
                            <Input
                              type="file"
                              className="w-full"
                              onChange={(e) =>
                                f.onChange(e.target.files?.[0] || null)
                              }
                            />
                          );

                        case "textarea":
                          return (
                            <Textarea
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              {...f}
                            />
                          );

                        case "date":
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal rounded-md border-gray-300",
                                      !f.value && "text-muted-foreground"
                                    )}
                                  >
                                    {f.value ? (
                                      format(new Date(f.value), "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    f.value ? new Date(f.value) : undefined
                                  }
                                  onSelect={(date) =>
                                    f.onChange(date ? date.toISOString() : "")
                                  }
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          );

                        case "checkbox":
                          return (
                            <div className="space-y-2">
                              {field.options?.map((opt, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                                >
                                  <Checkbox
                                    value={opt}
                                    onCheckedChange={(checked) => {
                                      const current = f.value || [];
                                      f.onChange(
                                        checked
                                          ? [...current, opt]
                                          : current.filter(
                                              (v: string) => v !== opt
                                            )
                                      );
                                    }}
                                  />
                                  <label className="text-sm text-gray-700">
                                    {opt}
                                  </label>
                                </div>
                              ))}
                            </div>
                          );

                        case "radio":
                          return (
                            <RadioGroup
                              onValueChange={f.onChange}
                              defaultValue={f.value}
                              className="space-y-2"
                            >
                              {field.options?.map((opt, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                                >
                                  <RadioGroupItem
                                    value={opt}
                                    id={`${field.name}-${i}`}
                                  />
                                  <label
                                    htmlFor={`${field.name}-${i}`}
                                    className="text-sm text-gray-700"
                                  >
                                    {opt}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          );

                        case "select":
                          return (
                            <Select
                              onValueChange={f.onChange}
                              defaultValue={f.value}
                            >
                              <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((opt, i) => (
                                  <SelectItem key={i} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </FormControl>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
