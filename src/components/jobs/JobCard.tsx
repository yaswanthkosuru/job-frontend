"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupeeIcon,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    employment_type: string;
    location: string;
    salary: string;
    created_at: string;
    is_active: boolean;
    recruiter: {
      organisation: {
        name: string;
        location: string;
        industry: string;
      };
    };
    skills: {
      name: string;
    }[];
  };
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const formatSalary = (salary: string) => {
    const amount = Number.parseFloat(salary);
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}LPA`;
    }
    return `${amount.toLocaleString()}`;
  };

  const formatEmploymentType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApplyNow = ({ job_id }: { job_id: string }) => {
    router.push(`browsejobs/${job_id}/`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {job.recruiter.organisation.name}
              </span>
            </div>
          </div>
          <Badge variant={job.is_active ? "default" : "destructive"}>
            {job.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">
              {formatEmploymentType(job.employment_type)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">
              {job.location}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <IndianRupeeIcon className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">
              {formatSalary(job.salary)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill.name} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Posted {formatDate(job.created_at)}</span>
          </div>
          <Button
            onClick={() => {
              handleApplyNow({ job_id: job.id });
            }}
            disabled={job.is_active === false}
            variant="default"
            className="px-6 ml-4 cursor-pointer"
          >
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
