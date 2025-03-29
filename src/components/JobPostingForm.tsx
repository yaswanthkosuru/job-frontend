"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { toast } from "sonner"
import { type JobPostingFormProps, type JobPostingFormValues, jobPostingSchema } from "@/types"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { SKILLS } from "@/constants"

const JobPostingForm: React.FC<JobPostingFormProps> = ({ onSubmit, defaultValues, isEdit = false }) => {
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      department: defaultValues?.department || "",
      description: defaultValues?.description || "",
      responsibilities: defaultValues?.responsibilities || "",
      employment_type: defaultValues?.employment_type || "full_time",
      required_skills: defaultValues?.required_skills || [],
      location: defaultValues?.location || "",
      salary: defaultValues?.salary || "",
      is_active: defaultValues?.is_active || true,
    },
  })

  const handleSubmit = async (data: JobPostingFormValues) => {
    try {
      await onSubmit(data)
    } catch (error) {
      toast.error("Failed to " + (isEdit ? "update" : "create") + " job posting")
    }
  }

  const handleSkillChange = (skill: string) => {
    return (checked: boolean) => {
      const currentValue = form.getValues("required_skills")
      if (checked) {
        form.setValue("required_skills", [...currentValue, skill])
      } else {
        form.setValue(
          "required_skills",
          currentValue.filter((s) => s !== skill),
        )
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader className="bg-muted/40 pb-4">
        <CardTitle className="text-2xl font-bold text-primary">{isEdit ? "Edit" : "Create"} Job Posting</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer" {...field} className="h-10" />
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
                    <FormLabel className="text-sm font-medium">Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Engineering" {...field} className="h-10" />
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
                    <FormLabel className="text-sm font-medium">Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter job description..." className="min-h-[150px] resize-y" {...field} />
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
                    <FormLabel className="text-sm font-medium">Responsibilities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter job responsibilities..."
                        className="min-h-[150px] resize-y"
                        {...field}
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
                    <FormLabel className="text-sm font-medium">Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <FormLabel className="text-sm font-medium">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bangalore, India" {...field} className="h-10" />
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
                    <FormLabel className="text-sm font-medium">Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1200000.00" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="required_skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Required Skills</FormLabel>
                    <div className="space-y-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between h-10">
                            Select Skills
                            <Badge variant="secondary" className="ml-2 font-normal">
                              {field.value.length} selected
                            </Badge>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 max-h-[300px] overflow-y-auto">
                          {SKILLS.map((skill) => (
                            <DropdownMenuCheckboxItem
                              key={skill}
                              checked={field.value.includes(skill)}
                              onCheckedChange={handleSkillChange(skill)}
                            >
                              {skill}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((skill) => (
                            <Badge key={skill} variant="outline" className="px-2 py-1">
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleSkillChange(skill)(false)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">Active</FormLabel>
                    <FormDescription className="text-xs">
                      Whether this job posting is currently active and visible to candidates.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto px-8" size="lg">
                {form.formState.isSubmitting ? "Submitting..." : isEdit ? "Update Job Posting" : "Create Job Posting"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default JobPostingForm

