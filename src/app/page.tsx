"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroGrid from "@/components/landingpage/herogrid";
import { ChevronRight, Users, Briefcase, Sparkles, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Smart Job Matching",
    description: "Our advanced AI matches candidates with the perfect job opportunities based on their skills and experience.",
    icon: <Briefcase className="h-8 w-8 text-primary" />
  },
  {
    title: "Seamless Application Tracking",
    description: "Easily track candidate progress through each stage of the hiring process with our intuitive dashboard.",
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    title: "Secure & Reliable",
    description: "Your data is protected with enterprise-grade security measures and compliance standards.",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />
  },
];

const testimonials = [
  {
    name: "John Smith",
    role: "Hiring Manager",
    quote: "The platform has streamlined our hiring process and helped us find top talent faster than ever before.",
    company: "TechCorp"
  },
  {
    name: "Sarah Johnson",
    role: "HR Director",
    quote: "I can't imagine going back to our old hiring system. This platform saves us time and money.",
    company: "Innovate Inc"
  }
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Grid Background */}
        <div className="absolute inset-0 z-20 ">
          <HeroGrid />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Streamline Your Hiring Process
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-lg leading-8 text-gray-600"
              >
                Manage job postings, track applications, and find the perfect candidates with our powerful hiring platform.
              </motion.p>
          
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to hire effectively
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Our platform provides all the tools you need to manage your hiring process efficiently.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What our users say
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Don't just take our word for it. Here's what our users have to say about our platform.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col"
                >
                  <blockquote className="mt-6 text-lg leading-8 text-gray-600">
                    "{testimonial.quote}"
                  </blockquote>
                  <figcaption className="mt-6">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm leading-6 text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </figcaption>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to streamline your hiring process?
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Start your free trial today and see how our platform can transform your hiring process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
