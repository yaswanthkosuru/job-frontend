"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import {
  FieldTypeProps,
  BuilderData,
  BuilderSchema,
} from "@/types/jobpostingformbuilder";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setDefinition } from "@/features/Forms/jobpostingformbuilderSlice";

// Schema

// Field Editor
function FieldEditor({
  index,
  control,
  watch,
  setValue,
  register,
}: FieldTypeProps) {
  const type = watch(`fields.${index}.type`);
  const options = watch(`fields.${index}.options`) || [];

  return (
    <Card className="space-y-4 border border-gray-200 shadow-sm bg-white">
      <div className="px-4 pt-4 font-semibold text-gray-700">
        Field #{index + 1}
      </div>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`fields.${index}.label`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`fields.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`fields.${index}.type`}
          render={() => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  defaultValue={type}
                  onValueChange={(val) => setValue(`fields.${index}.type`, val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(typeRegistry).map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2 pt-6">
          <Checkbox
            checked={watch(`fields.${index}.required`)}
            onCheckedChange={(val) =>
              setValue(`fields.${index}.required`, !!val)
            }
          />
          <FormLabel>Required</FormLabel>
        </div>

        {typeRegistry[type].hasOptions && (
          <>
            <div className="sm:col-span-2">
              <FormItem>
                <FormLabel>Options</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {options.map((opt: string, i: number) => (
                    <div
                      key={i}
                      className="inline-flex items-center bg-muted px-2 py-1 rounded text-sm"
                    >
                      {opt}
                      <button
                        type="button"
                        className="ml-1 text-red-500"
                        onClick={() => {
                          const newOptions: string[] = options.filter(
                            (_: string, idx: number) => idx !== i
                          );
                          setValue(`fields.${index}.options`, newOptions);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  placeholder="Add option and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        setValue(`fields.${index}.options`, [...options, val]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </FormItem>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Type Registry
const typeRegistry: Record<string, { hasOptions: boolean }> = {
  text: { hasOptions: false },
  textarea: { hasOptions: false },
  checkbox: { hasOptions: true },
  select: { hasOptions: true },
  radio: { hasOptions: true },
  number: { hasOptions: false },
  date: { hasOptions: false },
};

type FormType = {
  form: UseFormReturn<BuilderData>;
};
// Main FormBuilder
export default function JobPostingFormBuilder({ form }: FormType) {
  const { control, handleSubmit, watch, setValue, register } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fields",
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: BuilderData) => console.log(data);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto flex flex-col gap-6 p-4"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Form Builder</h1>
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                label: "",
                type: "text",
                required: false,
                multiple: false,
              })
            }
          >
            + Add Field
          </Button>
        </div>

        {fields.map((fld, idx) => (
          <div key={fld.id} className="relative">
            <FieldEditor
              index={idx}
              control={control}
              watch={watch}
              setValue={setValue}
              register={register}
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => move(idx, idx - 1)}
                disabled={idx === 0}
              >
                ↑
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => move(idx, idx + 1)}
                disabled={idx === fields.length - 1}
              >
                ↓
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(idx)}>
                🗑
              </Button>
            </div>
          </div>
        ))}

        <Button type="submit" className="w-full mt-4">
          Save Definition
        </Button>
      </form>
    </Form>
  );
}
