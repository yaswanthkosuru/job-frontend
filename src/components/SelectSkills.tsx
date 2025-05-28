"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SKILLS } from "@/constants";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { JobPostingFormValues } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type SkillsSelectorProps = {
  form: UseFormReturn<JobPostingFormValues>;
};

export function SkillsSelector({ form }: SkillsSelectorProps) {
  const [newSkill, setNewSkill] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(SKILLS);
  const [open, setOpen] = useState(false);

  const addNewSkill = () => {
    const s = newSkill.trim();
    if (s && !form.getValues("required_skills").includes(s)) {
      form.setValue("required_skills", [
        ...form.getValues("required_skills"),
        s,
      ]);
      setNewSkill("");
    }
  };

  useEffect(() => {
    setFilteredSkills(
      SKILLS.filter((val) => val.toLowerCase().includes(newSkill.toLowerCase()))
    );
  }, [newSkill]);

  const [selected, setSelected] = useState<string[]>([]);
  const watchedSkills = form.watch("required_skills");

  useEffect(() => {
    setSelected(watchedSkills);
  }, [watchedSkills]);
  const toggleSkill = (skill: string) => {
    const currentSkills = form.getValues("required_skills") || [];
    const updatedSkills = currentSkills.filter((s: string) => s !== skill);
    form.setValue("required_skills", updatedSkills);
  };
  const addSkill = (skill: string) => {
    console.log("add skill clicked", skill);
    const currentSkills = form.getValues("required_skills") || [];

    // Prevent duplicates (optional)
    if (!currentSkills.includes(skill)) {
      console.log("Setting");
      form.setValue("required_skills", [...currentSkills, skill]);
    }
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-10"
            onClick={() => setOpen(!open)}
          >
            Select Skills
            <span className="ml-2 font-medium">{selected.length} selected</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4 space-y-2">
          <Input
            placeholder="Type new skill and press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewSkill();
              }
            }}
            autoFocus
          />

          <ScrollArea className="w-full h-40 rounded-md border">
            <div>
              {filteredSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => addSkill(skill)}
                >
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.map((skill) => (
            <span
              key={skill}
              className="flex items-center bg-gray-100 px-2 py-1 rounded-full"
            >
              {skill}
              <button
                title={`Remove ${skill}`}
                onClick={() => toggleSkill(skill)}
                className="ml-1"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3 text-gray-600 hover:text-gray-800" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
