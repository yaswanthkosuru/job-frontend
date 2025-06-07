"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { UpdateStatusofJobApplication } from "@/features/jobapplicants/jobapplicantslice";
import { Application } from "@/types/jobApplicantstype";

const FormSchema = z.object({
  notes: z.string(),
});

export default function AdditionalNotes({
  selectedCandidate,
}: {
  selectedCandidate: Application;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      UpdateStatusofJobApplication({
        jobapplicant_id: selectedCandidate.id,
        status: selectedCandidate.status,
        additional_notes: data.notes,
      })
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about this candidate"
                  className="resize-none"
                  {...field}
                  defaultValue={selectedCandidate.additional_notes || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover:cursor-pointer">
          Add/update
        </Button>
      </form>
    </Form>
  );
}
