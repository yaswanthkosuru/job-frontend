"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { loginUser, useAuth } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

// Define form schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();
  const router = useRouter();
  
  // Initialize react-hook-form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle authentication status changes
  useEffect(() => {
    if (auth.status === "succeeded" && auth.token) {
      toast.success("Login successful!");
      console.log(auth.user)
      const role=auth.user?.role;
      if (role ==="candidate"){
        router.push("/browsejobs");
      }
      else if (role ==="interviewer"){
        router.push("/interviewer");
      }
      else{
        router.push("/dashboard/jobs");
      }
    }
    
    if (auth.status === "failed" && auth.error) {
      toast.error(auth.error || "Login failed. Please try again.");
    }
  }, [auth.status, auth.token, auth.error, router]);
  
  // Form submission handler
  const onSubmit = (data: LoginFormValues) => {
    dispatch(loginUser({
      email: data.email,
      password: data.password,
    }));
  };

  return (
    <div>
    <Navbar />
    <div className="grid grid-cols-2 min-h-screen w-full">
      {/* Left side - Login Form */}
      <div className="h-full bg-white flex justify-center items-center p-10">
        <Card className="w-[450px] border-none shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="email@example.com" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password" 
                          type="password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={auth.status === "loading"}
                >
                  {auth.status === "loading" ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Illustration */}
      <div className="h-full bg-[#F7F8FB] p-10 flex flex-col justify-center items-center">
        <div className="w-[70%] max-w-md">
          <Image
            src="/illustrations/login.jpg"
            alt="Login illustration"
            width={500}
            height={500}
            className="mb-8"
            priority
          />
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-muted-foreground mb-6">
            Log in to access your account and manage your recruitment process efficiently.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
              <span>Track your job applications</span>
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
              <span>Manage candidate profiles</span>
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
              <span>Access recruitment analytics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
