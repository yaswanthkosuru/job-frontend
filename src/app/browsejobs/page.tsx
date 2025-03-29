"use client"

import { useState } from "react"
import { JobFilters } from "@/components/jobs/JobFilters"
import { JobList } from "@/components/jobs/JobList"

// Sample job data
const jobsData = [
  {
    id: 21,
    recruiter: {
      user: {
        id: 77,
        email: "stonejennifer@example.net",
        phone: "+13043968499",
        role: "recruiter",
        username: "lorigarcia",
      },
      organisation: {
        id: 11,
        name: "Malone, Wyatt and Bruce",
        location: "North Amyside",
        industry: "Technology",
      },
    },
    skills: [
      {
        id: 21,
        name: "Node.js",
      },
      {
        id: 22,
        name: "Django",
      },
      {
        id: 29,
        name: "Machine Learning",
      },
    ],
    title: "Environmental health practitioner",
    department: "Sales",
    description:
      "A must executive. Its major then offer arm energy line. Wall foreign reveal price interview wear thought. Group teach plant whatever dinner too accept. Space some down agree bed indicate unit.",
    responsibilities: "Per identify less try huge in. Break candidate official build may weight. Mr good admit bar.",
    employment_type: "part_time",
    location: "Hoffmanville",
    salary: "154843.82",
    created_at: "2025-03-29T10:26:49.509796Z",
    updated_at: "2025-03-29T10:26:49.509811Z",
    is_active: false,
  },
  {
    id: 22,
    recruiter: {
      user: {
        id: 77,
        email: "stonejennifer@example.net",
        phone: "+13043968499",
        role: "recruiter",
        username: "lorigarcia",
      },
      organisation: {
        id: 11,
        name: "Malone, Wyatt and Bruce",
        location: "North Amyside",
        industry: "Technology",
      },
    },
    skills: [
      {
        id: 20,
        name: "React",
      },
      {
        id: 23,
        name: "Flask",
      },
      {
        id: 26,
        name: "AWS",
      },
      {
        id: 29,
        name: "Machine Learning",
      },
    ],
    title: "Advertising account executive",
    department: "Marketing",
    description:
      "Me speak plan staff west power gas. Debate whether growth budget. Though bill course always responsibility suddenly commercial. It four cause exist.",
    responsibilities: "Rate spend continue indeed. Beautiful write history gun next of consumer.",
    employment_type: "full_time",
    location: "Lake Leah",
    salary: "80113.12",
    created_at: "2025-03-29T10:26:50.943153Z",
    updated_at: "2025-03-29T10:26:50.943165Z",
    is_active: true,
  },
]

// Get unique departments, skills, and employment types for filters
const departments = [...new Set(jobsData.map((job) => job.department))]
const employmentTypes = [...new Set(jobsData.map((job) => job.employment_type))]
const allSkills = jobsData.flatMap((job) => job.skills.map((skill) => skill.name))
const uniqueSkills = [...new Set(allSkills)]

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showActiveOnly, setShowActiveOnly] = useState(false)

  // Filter jobs based on selected filters
  const filteredJobs = jobsData.filter((job) => {
    // Filter by search term
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by department
    const matchesDepartment = selectedDepartment === "" || job.department === selectedDepartment

    // Filter by employment type
    const matchesEmploymentType = selectedEmploymentType === "" || job.employment_type === selectedEmploymentType

    // Filter by skills
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => job.skills.some((jobSkill) => jobSkill.name === skill))

    // Filter by active status
    const matchesActiveStatus = !showActiveOnly || job.is_active

    return matchesSearch && matchesDepartment && matchesEmploymentType && matchesSkills && matchesActiveStatus
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <JobFilters
            departments={departments}
            employmentTypes={employmentTypes}
            uniqueSkills={uniqueSkills}
            onSearchChange={setSearchTerm}
            onDepartmentChange={setSelectedDepartment}
            onEmploymentTypeChange={setSelectedEmploymentType}
            onSkillToggle={(skill) => {
              if (selectedSkills.includes(skill)) {
                setSelectedSkills(selectedSkills.filter((s) => s !== skill))
              } else {
                setSelectedSkills([...selectedSkills, skill])
              }
            }}
            onActiveToggle={setShowActiveOnly}
            selectedDepartment={selectedDepartment}
            selectedEmploymentType={selectedEmploymentType}
            selectedSkills={selectedSkills}
            showActiveOnly={showActiveOnly}
          />
        </div>

        {/* Job List */}
        <div className="lg:col-span-3">
          <JobList jobs={filteredJobs} />
        </div>
      </div>
    </div>
  )
}
