"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { upload } from "@vercel/blob/client";
import { cn } from "@/lib/utils";
import JobPostingTitleSection from "./joppostingFormTitle";
import { FieldType } from "@/types/jobpostingformbuildertype";
import { JobPostingFormValues } from "@/types/jobpostingtype";

export type UserDetailsJobpostingFormProps = {
  fields: FieldType["fields"];
  jobpostingHeaderFields: JobPostingFormValues;
  is_preview?: boolean;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
};

export default function UserDetailsJobpostingForm({
  fields,
  jobpostingHeaderFields,
  is_preview = false,
  onSubmit,
}: UserDetailsJobpostingFormProps) {
  // Build default values
  const defaultValues = fields.reduce<Record<string, any>>((acc, field) => {
    if (field.type === "checkbox") acc[field.name] = [];
    else if (field.type === "file") acc[field.name] = null;
    else acc[field.name] = "";
    return acc;
  }, {});

  const form = useForm<Record<string, any>>({ defaultValues });
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const handleSubmit = async (data: Record<string, any>) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  // Handle file uploads via Vercel Blob
  async function handleFileChange(name: string, file: File) {
    setUploading((prev) => ({ ...prev, [name]: true }));
    try {
      const result = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/avatar/upload",
      });
      form.setValue(name, result.url);
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploading((prev) => ({ ...prev, [name]: false }));
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
      <JobPostingTitleSection jobpostingHeaderFields={jobpostingHeaderFields} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {fields.map((field, idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={field.name}
              rules={{ required: `${field.label} is required` }}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                  <FormControl>
                    {(() => {
                      switch (field.type) {
                        case "text":
                        case "number":
                          return (
                            <Input
                              id={field.name}
                              type={field.type}
                              placeholder={field.label}
                              {...f}
                            />
                          );

                        case "textarea":
                          return (
                            <Textarea
                              id={field.name}
                              placeholder={field.label}
                              {...f}
                            />
                          );

                        case "select":
                          return (
                            <Select onValueChange={f.onChange} value={f.value}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select..." />
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

                        case "radio":
                          return (
                            <RadioGroup
                              onValueChange={f.onChange}
                              value={f.value}
                              className="space-y-2"
                            >
                              {field.options?.map((opt, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-3"
                                >
                                  <RadioGroupItem
                                    value={opt}
                                    id={`${field.name}-${i}`}
                                  />
                                  <label htmlFor={`${field.name}-${i}`}>
                                    {opt}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          );

                        case "checkbox":
                          return (
                            <div className="space-y-2">
                              {field.options?.map((opt, i) => {
                                const selected = (f.value as string[]) || [];
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-3"
                                  >
                                    <Checkbox
                                      checked={selected.includes(opt)}
                                      onCheckedChange={(chk) => {
                                        const curr = [...selected];
                                        if (chk) curr.push(opt);
                                        else curr.splice(curr.indexOf(opt), 1);
                                        f.onChange(curr);
                                      }}
                                    />
                                    <label>{opt}</label>
                                  </div>
                                );
                              })}
                            </div>
                          );

                        case "date":
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full text-left",
                                    !f.value && "text-muted-foreground"
                                  )}
                                >
                                  {f.value
                                    ? format(new Date(f.value), "PPP")
                                    : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
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
                                    f.onChange(date?.toISOString() ?? "")
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

                        case "file":
                          return (
                            <div className="flex flex-col space-y-2">
                              <Input
                                id={field.name}
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileChange(field.name, file);
                                }}
                                disabled={uploading[field.name]}
                              />
                              {uploading[field.name] && <p>Uploading...</p>}
                              {f.value && (
                                <a
                                  href={f.value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View file
                                </a>
                              )}
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={is_preview} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
