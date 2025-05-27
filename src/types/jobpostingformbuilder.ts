import { z } from "zod";

export const FieldSchema = z.object({
  name: z.string().min(1, "Field name required"),
  label: z.string().min(1, "Label required"),
  type: z.enum([
    "text",
    "textarea",
    "checkbox",
    "select",
    "radio",
    "number",
    "date",
  ]),
  required: z.boolean(),
  multiple: z.boolean().optional(),
  options: z.array(z.string()).optional(),
});

export const BuilderSchema = z.object({
  fields: z.array(FieldSchema),
});

export type BuilderData = z.infer<typeof BuilderSchema>;

export type FieldTypeProps = {
  index: number;
  control: any;
  watch: any;
  setValue: any;
  register: any;
};
