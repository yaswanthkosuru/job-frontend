"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  createuser,
  useUserForm,
} from "@/features/Forms/userFormSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

// Define Zod schema for form validation
const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone number is required"),
});

type UserFormValues = z.infer<typeof userSchema>;

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useUserForm();
  const router = useRouter();
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: userData.username || "",
      email: userData.email || "",
      password: userData.password || "",
      phone: userData.phone || "",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log("Form submitted with data:", data);
    dispatch(createuser(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        organisation_id: userData.organisation_id,
        status: "idle",
      }
    ));
  };

  useEffect(() => {
    if (userData.status === "failed") {
      toast.error("Failed to submit form");
    }
    if (userData.status === "succeeded") {
      toast.success("Form submitted successfully");
      form.reset(); // Reset form on success
      router.push("/login"); // Redirect to login page
    }
  }, [userData.status, form, router]);

  return (
    <div className="flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-2xl font-semibold">User Registration</h2>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {userData.status !== "succeeded" && (
                <Button type="submit" className="w-full hover:cursor-pointer mt-4">
                  Submit
                </Button>
              )}
              
              {userData.status === "succeeded" && (
                <p className="text-green-600 mt-4">
                  Form submitted successfully!
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
