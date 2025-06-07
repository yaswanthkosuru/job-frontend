"use client";

import { useEffect, useState } from "react";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import {
  fetchJobPostings,
  useJobPostings,
} from "@/features/jobposting/jobpostingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useJobPostings();

  useEffect(() => {
    dispatch(fetchJobPostings());
  }, [dispatch]);

  // Get unique departments, skills, and employment types for filters
  const departments = [...new Set(jobs.map((job) => job.department))];
  const employmentTypes = [...new Set(jobs.map((job) => job.employment_type))];
  const allSkills = jobs.flatMap((job) =>
    job.skills.map((skill) => skill.name)
  );
  const uniqueSkills = [...new Set(allSkills)];

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    // Filter by search term
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by department
    const matchesDepartment =
      selectedDepartment === "" || job.department === selectedDepartment;

    // Filter by employment type
    const matchesEmploymentType =
      selectedEmploymentType === "" ||
      job.employment_type === selectedEmploymentType;

    // Filter by skills
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) =>
        job.skills.some((jobSkill) => jobSkill.name === skill)
      );

    // Filter by active status
    const matchesActiveStatus = !showActiveOnly || job.is_active;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesEmploymentType &&
      matchesSkills &&
      matchesActiveStatus
    );
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Filters Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="h-full">
            <JobFilters
              departments={departments}
              employmentTypes={employmentTypes}
              uniqueSkills={uniqueSkills}
              onSearchChange={setSearchTerm}
              onDepartmentChange={setSelectedDepartment}
              onEmploymentTypeChange={setSelectedEmploymentType}
              onSkillToggle={(skill) => {
                if (selectedSkills.includes(skill)) {
                  setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                } else {
                  setSelectedSkills([...selectedSkills, skill]);
                }
              }}
              onActiveToggle={setShowActiveOnly}
              selectedDepartment={selectedDepartment}
              selectedEmploymentType={selectedEmploymentType}
              selectedSkills={selectedSkills}
              showActiveOnly={showActiveOnly}
            />
          </div>
        </div>

        {/* Job List */}
        <div>
          <JobList jobs={filteredJobs} />
        </div>
      </div>
    </div>
  );
}
