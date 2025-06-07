import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobPostingCard } from "./JobPostingCard";
import { JobPostingDetails } from "@/types/jobpostingtype";

interface JobPostingListProps {
  jobs: JobPostingDetails[];
}

export const JobPostingList = ({ jobs }: JobPostingListProps) => {
  const activeJobs = jobs.filter((job) => job.is_active);
  const draftJobs = jobs.filter((job) => !job.is_active);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
        <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
        <TabsTrigger value="draft">Draft ({draftJobs.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-4 space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobPostingCard key={job.id} job={job} />)
        ) : (
          <p className="text-muted-foreground text-center">
            No job postings available.
          </p>
        )}
      </TabsContent>

      <TabsContent value="active" className="mt-4 space-y-4">
        {activeJobs.length > 0 ? (
          activeJobs.map((job) => <JobPostingCard key={job.id} job={job} />)
        ) : (
          <p className="text-muted-foreground text-center">
            No active job postings.
          </p>
        )}
      </TabsContent>

      <TabsContent value="draft" className="mt-4 space-y-4">
        {draftJobs.length > 0 ? (
          draftJobs.map((job) => <JobPostingCard key={job.id} job={job} />)
        ) : (
          <p className="text-muted-foreground text-center">
            No draft job postings.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
};
