import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import JobPostingForm from "@/components/JobPostingForm";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createJobPosting } from "@/features/Forms/jobPostingFormSlice";
import { JobPostingFormValues } from "@/types/jobPosting";

export const CreateJobPostingDialog = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (data: JobPostingFormValues) => {
    await dispatch(createJobPosting(data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Job Posting
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Job Posting</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new job posting.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <JobPostingForm onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
