'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { CandidateProfile } from "@/types/users"
import { z } from "zod"
import { SKILLS } from "@/constants"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Create a Zod schema for CandidateProfile
const candidateProfileSchema = z.object({
  user: z.object({
    email: z.string().email(),
    phone: z.string(),
    username: z.string()
  }),
  linkedin_profile: z.string().url(),
  github_profile: z.string().url(),
  degree: z.string(),
  institution: z.string(),
  year_of_completion: z.number(),
  job_title: z.string(),
  company: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  currently_working: z.boolean(),
  skills: z.array(z.string()),
  job_type: z.string(),
  expected_salary: z.string(),
  notice_period: z.number(),
  resume_file_url: z.string().url()
})

interface AddCandidateFormProps {
  onSubmit: (data: z.infer<typeof candidateProfileSchema>) => Promise<void>
  defaultValues?: Partial<z.infer<typeof candidateProfileSchema>>
}

const CandidateForm: React.FC<AddCandidateFormProps> = ({ onSubmit, defaultValues }) => {
  const form = useForm<z.infer<typeof candidateProfileSchema>>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      user: {
        email: defaultValues?.user?.email || "",
        phone: defaultValues?.user?.phone || "",
        username: defaultValues?.user?.username || ""
      },
      linkedin_profile: defaultValues?.linkedin_profile || "",
      github_profile: defaultValues?.github_profile || "",
      degree: defaultValues?.degree || "",
      institution: defaultValues?.institution || "",
      year_of_completion: defaultValues?.year_of_completion || 0,
      job_title: defaultValues?.job_title || "",
      company: defaultValues?.company || "",
      start_date: defaultValues?.start_date || "",
      end_date: defaultValues?.end_date || "",
      currently_working: defaultValues?.currently_working || false,
      skills: defaultValues?.skills || [],
      job_type: defaultValues?.job_type || "",
      expected_salary: defaultValues?.expected_salary || "",
      notice_period: defaultValues?.notice_period || 0,
      resume_file_url: defaultValues?.resume_file_url || ""
    },
  })

  const handleSubmit = async (data: z.infer<typeof candidateProfileSchema>) => {
    try {
      await onSubmit(data)
      toast.success("Candidate added successfully!")
    //   form.reset()
    } catch (error) {

      toast.error("Failed to add candidate")
    }
  }

  const handleSkillChange = (skill: string) => {
    return (checked: boolean) => {
      const currentValue = form.getValues("skills")
      if (checked) {
        form.setValue("skills", [...currentValue, skill])
      } else {
        form.setValue(
          "skills",
          currentValue.filter((s) => s !== skill),
        )
      }
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Candidate</h1>
          <p className="text-gray-600">Fill in the details to add a new candidate</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="user.username"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
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
                <FormField
                  control={form.control}
                  name="user.email"
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
                  name="user.phone"
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
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="linkedin_profile"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter LinkedIn URL"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github_profile"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Github Profile</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter GitHub URL"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Degree</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter degree"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Institution</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter institution name"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year_of_completion"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Year of Completion</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter year"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
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
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter company name"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currently_working"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded border-gray-300 text-primary"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium text-gray-700">Currently Working</FormLabel>
                      </div>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Skills and Preferences */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills and Preferences</h2>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Skills</FormLabel>
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
                      </div>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_type"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Job Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-gray-300 focus:border-primary focus:ring-primary">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expected_salary"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Expected Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter expected salary"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notice_period"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Notice Period (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                          placeholder="Enter notice period"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Resume */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
              <FormField
                control={form.control}
                name="resume_file_url"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Resume URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        {...field}
                        className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Enter resume URL"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Add Candidate
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CandidateForm