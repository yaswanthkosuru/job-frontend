"use client";
import { AppDispatch } from "@/app/store";
import {
  createorganisation,
  useOrganisationForm,
} from "@/features/Forms/organisationSlice";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Zod schema for form validation
const organisationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  industry: z.enum(["Technology", "Finance", "Healthcare", "Education"], {
    required_error: "Industry is required",
  }),
});

const OrganisationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formdata = useOrganisationForm();
  const form = useForm<z.infer<typeof organisationSchema>>({
    resolver: zodResolver(organisationSchema), // Use Zod resolver
    defaultValues: {
      name: "",
      location: "",
      industry: "Technology", // Provide a valid default value
    },
  });

  const onSubmit = (data: z.infer<typeof organisationSchema>) => {
    dispatch(
      createorganisation({
        name: data.name,
        location: data.location,
        industry: data.industry,
        status: "idle",
      })
    );
  };

  useEffect(() => {
    if (formdata.status === "failed") {
      toast.error("Failed to submit form");
    }
    if (formdata.status === "succeeded") {
      toast.success("Form submitted successfully");
      form.reset(); // Reset form on success
    }
  }, [form, formdata.status]);

  return (
    <div className="">
      <Card className="w-96 h-screen">
        <CardHeader>
          <h2 className="text-2xl font-semibold mb-4">Organisation Form</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="industry"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Industries</SelectLabel>
                            <SelectItem value="Technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formdata.status !== "succeeded" && (
                <Button
                  type="submit"
                  className="w-full cursor-pointer hover:bg-opacity-90 mt-4"
                >
                  Submit
                </Button>
              )}
              {formdata.status === "succeeded" && (
                <p className="text-green-600 mt-4">
                  Form submitted successfully!
                </p>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
export default OrganisationForm;
