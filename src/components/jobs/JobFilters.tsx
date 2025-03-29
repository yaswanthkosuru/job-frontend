"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface JobFiltersProps {
  departments: string[]
  employmentTypes: string[]
  uniqueSkills: string[]
  onSearchChange: (term: string) => void
  onDepartmentChange: (department: string) => void
  onEmploymentTypeChange: (type: string) => void
  onSkillToggle: (skill: string) => void
  onActiveToggle: (active: boolean) => void
  selectedDepartment: string
  selectedEmploymentType: string
  selectedSkills: string[]
  showActiveOnly: boolean
}

export function JobFilters({
  departments,
  employmentTypes,
  uniqueSkills,
  onSearchChange,
  onDepartmentChange,
  onEmploymentTypeChange,
  onSkillToggle,
  onActiveToggle,
  selectedDepartment,
  selectedEmploymentType,
  selectedSkills,
  showActiveOnly,
}: JobFiltersProps) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search jobs..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Department */}
        <div>
          <Label htmlFor="department" className="text-sm font-medium mb-2">
            Department
          </Label>
          <Select
            value={selectedDepartment}
            onValueChange={onDepartmentChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all-departments">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employment Type */}
        <div>
          <Label htmlFor="employmentType" className="text-sm font-medium mb-2">
            Employment Type
          </Label>
          <Select
            value={selectedEmploymentType}
            onValueChange={onEmploymentTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all-types">All Types</SelectItem>
              {employmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills */}
        <div>
          <Label className="text-sm font-medium mb-2">Skills</Label>
          <div className="flex flex-wrap gap-2">
            {uniqueSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => onSkillToggle(skill)}
                />
                <Label htmlFor={`skill-${skill}`} className="text-sm">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="active-only"
            checked={showActiveOnly}
            onCheckedChange={(checked) => onActiveToggle(checked as boolean)}
          />
          <Label htmlFor="active-only" className="text-sm">
            Show Active Only
          </Label>
        </div>
      </div>
    </div>
  )
}
