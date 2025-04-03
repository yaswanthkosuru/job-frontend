'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { z } from "zod"

// Create a Zod schema for Interviewer
const interviewerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  role: z.literal("interviewer"),
  username: z.string().optional(),
  job_title: z.string(),
  department: z.string(),
  years_of_experience: z.union([z.number(), z.string()]).transform(val => typeof val === 'string' ? Number(val) : val),
  bio: z.string(),
  added_by_id: z.number()
})

interface InterviewerFormProps {
  onSubmit: (data: z.infer<typeof interviewerSchema>) => Promise<void>
  defaultValues?: Partial<z.infer<typeof interviewerSchema>>
}

const InterviewerForm: React.FC<InterviewerFormProps> = ({ onSubmit, defaultValues }) => {
  
    const form = useForm<z.infer<typeof interviewerSchema>>({
    resolver: zodResolver(interviewerSchema),
    defaultValues: {
      email: defaultValues?.email || "",
      password: defaultValues?.password || "",
      phone: defaultValues?.phone || "",
      role: "interviewer",
      username: defaultValues?.username || "",
      job_title: defaultValues?.job_title || "",
      department: defaultValues?.department || "",
      years_of_experience: defaultValues?.years_of_experience ? Number(defaultValues.years_of_experience) : 0,
      bio: defaultValues?.bio || "",
      added_by_id: defaultValues?.added_by_id || 0
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      toast.success("Interviewer added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add interviewer");
    }
  });

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Interviewer</h1>
        <p className="text-gray-600">Fill in the details to add a new interviewer</p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter phone number"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Username (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter username"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter job title"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Department</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter department"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years_of_experience"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter years of experience"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bio</h2>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium text-gray-700">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                      placeholder="Enter your bio"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
            Add Interviewer
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default InterviewerForm