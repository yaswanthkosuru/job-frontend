import { Check, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import React from "react"

interface MultiSelectSkillsProps {
  value: number[]
  onChange: (value: number[]) => void
}

const technicalSkills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
  { id: 4, name: "React" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "SQL" },
  { id: 7, name: "HTML/CSS" },
  { id: 8, name: "Git" },
  { id: 9, name: "Docker" },
  { id: 10, name: "AWS" },
  { id: 11, name: "TypeScript" },
  { id: 12, name: "C++" },
  { id: 13, name: "C#" },
  { id: 14, name: "PHP" },
  { id: 15, name: "Ruby" },
  { id: 16, name: "Swift" },
  { id: 17, name: "Kotlin" },
  { id: 18, name: "Go" },
  { id: 19, name: "Rust" },
  { id: 20, name: "Flutter" },
  { id: 21, name: "Angular" },
  { id: 22, name: "Vue.js" },
  { id: 23, name: "MongoDB" },
  { id: 24, name: "Redis" },
  { id: 25, name: "PostgreSQL" },
  { id: 26, name: "MySQL" },
  { id: 27, name: "Django" },
  { id: 28, name: "Spring Boot" },
  { id: 29, name: "Express.js" },
  { id: 30, name: "Kubernetes" },
  { id: 31, name: "TensorFlow" },
  { id: 32, name: "PyTorch" },
  { id: 33, name: "Jenkins" },
  { id: 34, name: "Jira" },
  { id: 35, name: "Confluence" },
  { id: 36, name: "Tableau" },
  { id: 37, name: "Power BI" },
  { id: 38, name: "AWS Lambda" },
  { id: 39, name: "Azure" },
  { id: 40, name: "GCP" },
];

export function MultiSelectSkills({
  value,
  onChange
}: MultiSelectSkillsProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className={cn(
          "relative flex w-full cursor-default flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          !value.length && "text-muted-foreground"
        )}>
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((skillId) => {
                const skill = technicalSkills.find((s) => s.id === skillId)
                return skill ? (
                  <div
                    key={skillId}
                    className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-sm"
                  >
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onChange(value.filter((id) => id !== skillId))
                      }}
                      className="-m-1 p-1 hover:bg-primary/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null
              })}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Select your skills...</span>
          )}
          <Check className="ml-auto h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="h-[300px] overflow-y-auto space-y-1 p-2">
          {technicalSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => {
                const newValue = value.includes(skill.id)
                  ? value.filter((id) => id !== skill.id)
                  : [...value, skill.id]
                onChange(newValue)
              }}
              className={cn(
                "w-full rounded-md px-3 py-2 text-sm transition-colors",
                value.includes(skill.id)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
