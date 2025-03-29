"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { fetchSkills } from "@/features/candidates/addCandidateSlice";
import { Skill } from "@/features/candidates/addCandidateSlice";

interface MultiSelectProps {
  value: Skill[];
  onChange: (value: Skill[]) => void;
}

export function MultiSelect({ value, onChange }: MultiSelectProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, skillsStatus } = useSelector((state: RootState) => state.addCandidate);
  const [newSkillName, setNewSkillName] = useState("");

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const selectedSkills = new Set(value.map(skill => skill.name));

  const handleSelect = (skill: Skill) => {
    const newSkills = [...value];
    const existingIndex = newSkills.findIndex(s => s.name === skill.name);
    
    if (existingIndex === -1) {
      newSkills.push(skill);
    } else {
      newSkills.splice(existingIndex, 1);
    }
    
    onChange(newSkills);
  };

  const handleCreateNewSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now(),
        name: newSkillName.trim(),
      };
      
      handleSelect(newSkill);
      setNewSkillName("");
      dispatch(fetchSkills());
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-sm"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => handleSelect(skill)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Add Skill</span>
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Select Skills</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-1">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter new skill..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateNewSkill}
                disabled={!newSkillName.trim()}
              >
                Add
              </Button>
            </div>
          </div>
          <DropdownMenuSeparator />
          {skills.map((skill) => (
            <DropdownMenuItem
              key={skill.id}
              onClick={() => handleSelect(skill)}
              className="cursor-pointer"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedSkills.has(skill.name) ? "opacity-100" : "opacity-0"
                )}
              />
              {skill.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
