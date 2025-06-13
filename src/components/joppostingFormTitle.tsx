import { RootState } from "@/app/store";

import {
  JobPostingFormSliceState,
  JobPostingFormValues,
} from "@/types/jobpostingtype";
import {
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  BookOpen,
  Star,
} from "lucide-react";

interface JobPostingTitleSectionProps {
  jobpostingHeaderFields: JobPostingFormValues;
}
export default function JobPostingTitleSection({
  jobpostingHeaderFields,
}: JobPostingTitleSectionProps) {
  if (!jobpostingHeaderFields) {
    return <div>Please save jobposting to view preview...</div>;
  }
  const {
    title,
    department,
    description,
    responsibilities,
    employment_type,
    required_skills,
    location,
    salary,
    is_active,
  } = jobpostingHeaderFields;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl tracking-wider">{title}</h1>
        <p className="text-sm text-gray-500 italic flex items-center gap-1">
          <MapPin size={14} className="text-gray-400" />
          {location || "Remote"}
        </p>
      </div>

      <div>
        <h2 className="flex items-center gap-2 mb-2">
          <Users size={18} /> Company Culture
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We foster a supportive and collaborative environment where continuous
          learning and personal growth are highly valued. You'll be part of a
          passionate team dedicated to making education accessible and
          enjoyable.
        </p>
      </div>

      <div>
        <h2 className="flex items-center gap-2 mb-2">
          <Briefcase size={18} /> Job Responsibilities
        </h2>
        <ul className="space-y-2">
          {responsibilities?.map((responsibility, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              {/* remove size={…}, fix with h-4 w-4 and disable shrinking */}
              <CheckCircle className="flex-shrink-0 h-4 w-4 text-green-600 mt-1" />
              {/* turn span into a block-level element so it can wrap cleanly */}
              <span className="leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2  mb-2">
          <BookOpen size={18} /> Requirements
        </h2>
        <ul className="space-y-2">
          {required_skills?.map((responsibility, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              {/* remove size={…}, fix with h-4 w-4 and disable shrinking */}
              <CheckCircle className="flex-shrink-0 h-4 w-4 text-green-600 mt-1" />
              {/* turn span into a block-level element so it can wrap cleanly */}
              <span className="leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2  mb-2">
          <Star size={18} /> Benefits
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Flexible remote work schedule.",
            "Competitive hourly compensation.",
            "Opportunities for professional development and training.",
            "Supportive team environment and resources.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-yellow-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
