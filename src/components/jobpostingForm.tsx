"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Briefcase,
  BookOpen,
  Users,
  Star,
  MapPin,
} from "lucide-react";
const careerFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  resume: z
    .any()
    .refine((files) => files?.length === 1, "Resume/CV file is required"),
  coverLetter: z.any().optional(),
  linkedIn: z.string().url("Invalid URL").optional().or(z.literal("")),
  careerStage: z.string().min(1, "Current Career Stage is required"),
  yearsExperience: z
    .number({ invalid_type_error: "Years of Experience is required" })
    .min(0, "Must be 0 or more"),
  compensation: z
    .number({ invalid_type_error: "Current Compensation is required" })
    .min(0, "Must be 0 or more"),
  gender: z.string().min(1, "Gender is required"),
  industry: z.string().min(1, "Current Industry is required"),
  workLocation: z.string().min(1, "Preferred Work Location is required"),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;

export function CareerForm() {
  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: null,
      linkedIn: "",
      careerStage: "",
      yearsExperience: 0,
      compensation: 0,
      gender: "",
      industry: "",
      workLocation: "",
    },
  });

  function onSubmit(data: CareerFormValues) {
    console.log("Form data:", data);
    alert("Form submitted!");
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof CareerFormValues
  ) {
    const files = e.target.files;
    if (files) {
      form.setValue(name, files);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        {/* First Name */}
        <FormItem>
          <FormLabel>First Name *</FormLabel>
          <FormControl>
            <Input {...form.register("firstName")} placeholder="First Name" />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Last Name */}
        <FormItem>
          <FormLabel>Last Name *</FormLabel>
          <FormControl>
            <Input {...form.register("lastName")} placeholder="Last Name" />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Email */}
        <FormItem>
          <FormLabel>Email *</FormLabel>
          <FormControl>
            <Input
              type="email"
              {...form.register("email")}
              placeholder="Email"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Phone */}
        <FormItem>
          <FormLabel>Phone *</FormLabel>
          <FormControl>
            <Input {...form.register("phone")} placeholder="Phone Number" />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Resume/CV - File input (separate, since Input component is text only) */}
        <FormItem>
          <FormLabel className="font-medium text-gray-700">
            Resume/CV <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(e) => handleFileChange(e, "resume")}
              required
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition"
              title="Upload your resume or CV"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Cover Letter - Optional */}
        {/* <FormItem>
          <FormLabel>Cover Letter</FormLabel>
          <FormControl>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(e) => handleFileChange(e, "coverLetter")}
              className="file-input file-input-bordered w-full"
              placeholder="Upload your cover letter (optional)"
              title="Upload your cover letter"
            />
          </FormControl>
          <FormMessage />
        </FormItem> */}

        {/* LinkedIn Profile */}
        <FormItem>
          <FormLabel>LinkedIn Profile</FormLabel>
          <FormControl>
            <Input
              type="url"
              {...form.register("linkedIn")}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Current Career Stage */}
        <FormItem>
          <FormLabel>Current Career Stage *</FormLabel>
          <FormControl>
            <Input
              {...form.register("careerStage")}
              placeholder="e.g., Entry Level, Mid Level"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Years of Experience */}
        <FormItem>
          <FormLabel>Years of Experience *</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              {...form.register("yearsExperience", { valueAsNumber: true })}
              placeholder="Years of Experience"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Current Compensation */}
        <FormItem>
          <FormLabel>Current Compensation *</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              {...form.register("compensation", { valueAsNumber: true })}
              placeholder="Current Compensation"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Gender */}
        <FormItem>
          <FormLabel>Gender *</FormLabel>
          <FormControl>
            <Input {...form.register("gender")} placeholder="Gender" />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Current Industry */}
        <FormItem>
          <FormLabel>Current Industry *</FormLabel>
          <FormControl>
            <Input {...form.register("industry")} placeholder="Industry" />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Preferred Work Location */}
        <FormItem>
          <FormLabel>Preferred Work Location *</FormLabel>
          <FormControl>
            <Input
              {...form.register("workLocation")}
              placeholder="Preferred Work Location"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export function JobTitleSection() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl tracking-wider">Mathematics Tutor</h1>
        <p className="text-sm text-gray-500 italic flex items-center gap-1">
          <MapPin size={14} className="text-gray-400" />
          Remote, India
        </p>
      </div>

      <div>
        <h2 className="flex items-center gap-2 mb-2">
          <Users size={18} /> Company Culture
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We foster a supportive and collaborative environment where continuous
          learning and personal growth are highly valued. You'll be part of a
          passionate team dedicated to making education accessible and
          enjoyable.
        </p>
      </div>

      <div>
        <h2 className="flex items-center gap-2 mb-2">
          <Briefcase size={18} /> Job Responsibilities
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Provide personalized math tutoring to students of various ages and skill levels.",
            "Create engaging lesson plans and materials tailored to individual student needs.",
            "Track student progress and provide constructive feedback.",
            "Maintain communication with students and parents regarding performance and goals.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2  mb-2">
          <BookOpen size={18} /> Requirements
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Strong proficiency in mathematics at the required tutoring level.",
            "Previous tutoring or teaching experience preferred.",
            "Excellent communication and interpersonal skills.",
            "Reliable internet connection and a suitable remote work environment.",
            "Passion for education and helping students succeed.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-blue-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2  mb-2">
          <Star size={18} /> Benefits
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Flexible remote work schedule.",
            "Competitive hourly compensation.",
            "Opportunities for professional development and training.",
            "Supportive team environment and resources.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-yellow-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Main Form
export default function JobPostingForm() {
  return (
    <div>
      <Card className="max-w-4xl flex flex-col gap-10 mx-auto px-16 py-10">
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
        <CardContent className="flex flex-col gap-8">
          <JobTitleSection />
          <CareerForm />
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
