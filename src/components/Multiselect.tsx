import React, { useState, useMemo, useCallback } from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Default options
const DEFAULT_SKILLS = ["React", "Node.js", "Python", "AWS"];

/**
 * Generic multi-select skill component with React Hook Form integration.
 *
 * @param name - field name in form
 * @param control - RHF control object
 * @param options - initial list of available skills
 * @param placeholder - button placeholder text
 * @param className - custom container className
 */
export default function SkillSelect<T extends FieldValues = FieldValues>({
  name,
  control,
  options = DEFAULT_SKILLS,
  placeholder = "Select or type skills",
  className,
  ...rest
}: UseControllerProps<T> & {
  options?: string[];
  placeholder?: string;
  className?: string;
}) {
  const {
    field: { value = [], onChange },
  } = useController({ name, control, ...rest });

  const [available, setAvailable] = useState<string[]>(options);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Filter options based on query
  const filtered = useMemo(
    () =>
      query
        ? available.filter((opt) =>
            opt.toLowerCase().includes(query.toLowerCase())
          )
        : available,
    [available, query]
  );

  const addSkill = useCallback(() => {
    const skill = query.trim();
    if (!skill) return;
    if (!available.includes(skill)) {
      setAvailable((prev) => [...prev, skill]);
    }
    if (!value.includes(skill)) {
      onChange([...value, skill]);
    }
    setQuery("");
    setOpen(false);
  }, [query, available, value, onChange]);

  const toggleSkill = useCallback(
    (skill: string) => {
      if (value.includes(skill)) {
        onChange(value.filter((s: string) => s !== skill));
      } else {
        onChange([...value, skill]);
      }
    },
    [value, onChange]
  );

  const removeSkill = useCallback(
    (skill: string) => {
      onChange(value.filter((s: string) => s !== skill));
    },
    [value, onChange]
  );

  return (
    <div className={cn("w-full max-w-sm space-y-2", className)}>
      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((skill: string) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0 ? placeholder : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
          <Command>
            <CommandInput
              autoFocus
              placeholder="Search or add skills..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty>
              <div className="flex justify-between items-center px-2 py-1">
                <span>No results</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={addSkill}
                  disabled={!query.trim()}
                >
                  Add "{query.trim()}"
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((opt) => (
                <CommandItem
                  key={opt}
                  onSelect={() => toggleSkill(opt)}
                  className="flex items-center justify-between"
                >
                  <span>{opt}</span>
                  {value.includes(opt) && <Check className="h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
