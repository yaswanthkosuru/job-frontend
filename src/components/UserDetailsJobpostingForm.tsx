"use client";

import React from "react";
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
import { cn } from "@/lib/utils";
import JobPostingTitleSection from "./joppostingFormTitle";
import { FieldType } from "@/types/jobpostingformbuildertype";
import { JobPostingFormValues } from "@/types/jobpostingtype";

type UserDetailsJobpostingFormProps = {
  fields: FieldType["fields"];
  jobpostingHeaderFields: JobPostingFormValues;
  is_preview?: boolean;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
};

export default function UserDetailsJobpostingForm({
  fields,
  jobpostingHeaderFields,
  is_preview,
  onSubmit,
}: UserDetailsJobpostingFormProps) {
  //
  // 1) Build an object of defaultValues keyed by each field.name.
  //
  console.log(fields, "fields");
  const defaultValues = fields?.reduce<Record<string, any>>((acc, field) => {
    switch (field.type) {
      case "checkbox":
        // will hold an array of selected options
        acc[field.name] = [];
        break;
      case "file":
        acc[field.name] = null;
        break;
      default:
        // text, number, textarea, select, radio, date → empty string
        acc[field.name] = "";
        break;
    }
    return acc;
  }, {});

  //
  // 2) useForm<Record<string, any>>() so that each dynamic key is allowed.
  //
  const form = useForm<Record<string, any>>({
    defaultValues,
  });

  const handleSubmit = async (data: Record<string, any>) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
      <JobPostingTitleSection jobpostingHeaderFields={jobpostingHeaderFields} />

      <Form {...form}>
        {/* 3) wire up handleSubmit correctly */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {fields.map((field, idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={field.name}
              rules={{
                required: `${field.label} is required`,
              }}
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
                              placeholder={`${field.name.toLowerCase()}`}
                              {...f}
                            />
                          );

                        case "file":
                          return (
                            <Input
                              id={field.name}
                              type="file"
                              onChange={(e) =>
                                f.onChange(e.target.files?.[0] ?? null)
                              }
                            />
                          );

                        case "textarea":
                          return (
                            <Textarea
                              id={field.name}
                              placeholder={` ${field.name.toLowerCase()}`}
                              {...f}
                            />
                          );

                        case "date":
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full text-left font-normal rounded-md border-gray-300",
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

                        case "checkbox":
                          return (
                            <div className="space-y-2">
                              {field.options?.map((opt, i) => {
                                // cast f.value to string[] for TS
                                const selectedArr = (f.value as string[]) || [];
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                                  >
                                    <Checkbox
                                      checked={selectedArr.includes(opt)}
                                      onCheckedChange={(checked) => {
                                        const curr = [...selectedArr];
                                        if (checked) {
                                          curr.push(opt);
                                        } else {
                                          const idx = curr.indexOf(opt);
                                          if (idx > -1) curr.splice(idx, 1);
                                        }
                                        f.onChange(curr);
                                      }}
                                    />
                                    <label
                                      htmlFor={`${field.name}-${i}`}
                                      className="text-sm text-gray-700"
                                    >
                                      {opt}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          );

                        case "radio":
                          return (
                            <RadioGroup
                              onValueChange={f.onChange}
                              value={f.value as string}
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
                              value={f.value as string}
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
            disabled={is_preview}
            className="w-full text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
