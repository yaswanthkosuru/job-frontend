"use client"

import { JobCard } from "./JobCard"

interface JobListProps {
  jobs: any[]
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
