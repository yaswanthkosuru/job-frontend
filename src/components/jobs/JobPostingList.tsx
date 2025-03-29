import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobPostingCard } from "./JobPostingCard";
import { JobPostingDetails } from "@/types/jobPosting";

interface JobPostingListProps {
  jobs: JobPostingDetails[];
}

export const JobPostingList = ({ jobs }: JobPostingListProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Jobs</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <div className="grid gap-4">
          {jobs.map((job: JobPostingDetails) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="active" className="mt-4">
        <div className="grid gap-4">
          {jobs.filter((job: JobPostingDetails) => job.is_active).map((job: JobPostingDetails) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="draft" className="mt-4">
        <div className="grid gap-4">
          {jobs.filter((job: JobPostingDetails) => !job.is_active).map((job: JobPostingDetails) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
