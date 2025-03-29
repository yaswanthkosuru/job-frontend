"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Easy Job Posting",
    description: "Quickly create and manage job listings with our intuitive interface",
    icon: "📝",
  },
  {
    title: "Candidate Management",
    description: "Effortlessly track applications and manage candidate profiles",
    icon: "👥",
  },
  {
    title: "Analytics Dashboard",
    description: "Get insights into your hiring process and candidate flow",
    icon: "📊",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden py-24 sm:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
        >
          Streamline Your Hiring Process
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Manage job postings, track applications, and find the perfect candidates with our powerful hiring platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Button size="lg" className="rounded-full px-8 py-4 text-lg font-medium shadow-md hover:shadow-lg">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">Everything you need to hire effectively</h2>
          <p className="mt-2 text-lg text-gray-600">
            Our platform provides all the tools you need to manage your hiring process efficiently.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex items-center space-x-4">
                  <span className="text-5xl">{feature.icon}</span>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Page;
