import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  IndianRupee,
  Layers,
  Clock,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobPostingDetails } from "@/types/jobpostingtype";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import JobPostingForm from "@/components/JobPostingForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { updateJobPosting } from "@/features/Forms/jobPostingFormSlice";
import { JobPostingFormValues } from "@/types/jobpostingtype";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface JobPostingCardProps {
  job: JobPostingDetails;
}

export const JobPostingCard = ({ job }: JobPostingCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const skills = job.skills.map((skill: { name: string }) => skill.name);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: JobPostingFormValues) => {
    await dispatch(
      updateJobPosting({
        id: job.id.toString(),
        jobPostingData: {
          ...data,
          employment_type: data.employment_type as
            | "full_time"
            | "part_time"
            | "contract"
            | "internship",
        },
      })
    );
    setOpen(false);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold group-hover:text-primary">
                {job.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {job.department} • {job.employment_type.replace("_", " ")}
              </p>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                <Pencil className="h-4 w-4 text-muted-foreground" />
                Edit
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">
              {job.recruiter.organisation.name} •{" "}
              {job.recruiter.organisation.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{job.location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{job.salary}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">
              {new Date(job.created_at).toLocaleDateString()}
            </p>
          </div>

          <Button
            onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
            className="w-1/2"
            size="sm"
          >
            view Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
