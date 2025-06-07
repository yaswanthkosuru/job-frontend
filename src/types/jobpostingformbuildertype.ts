import { z } from "zod";
// Type Registry
export const typeRegistry: Record<string, { hasOptions: boolean }> = {
  text: { hasOptions: false },
  textarea: { hasOptions: false },
  checkbox: { hasOptions: true },
  select: { hasOptions: true },
  radio: { hasOptions: true },
  number: { hasOptions: false },
  file: { hasOptions: false },
  date: { hasOptions: false },
};
  export const FieldSchema = z
    .object({
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
        "file",
      ]),
      required: z.boolean(),
      options: z.array(z.string()).optional(),
    })
    .transform((raw) => {
      // This runs _only_ when you call parse()
      if (!typeRegistry[raw.type].hasOptions) {
        return { ...raw, options: [] };
      }
      return raw;
    });

  export const FieldTemplateSchema = z.object({
    fields: z.array(FieldSchema),
  });

export type FieldType = z.infer<typeof FieldTemplateSchema>;

export type FieldTypeProps = {
  index: number;
  control: any;
  watch: any;
  setValue: any;
  register: any;
};

export interface FormBuilderState {
  formData: FieldType;
  isPreviewMode: boolean;
}
