import { RootState } from "@/app/store";
import { useJobPostingForm } from "@/features/Forms/jobPostingFormSlice";
import {
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  BookOpen,
  Star,
} from "lucide-react";

export default function JobPostingTitleSection() {
  const jobDetails = useJobPostingForm();

  if (!jobDetails) {
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
  } = jobDetails;
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
        <ul className="space-y-2 text-sm text-gray-700">
          {/* {[
            "Provide personalized math tutoring to students of various ages and skill levels.",
            "Create engaging lesson plans and materials tailored to individual student needs.",
            "Track student progress and provide constructive feedback.",
            "Maintain communication with students and parents regarding performance and goals.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))} */}
          {responsibilities}
        </ul>
      </div>

      <div>
        <h2 className="flex items-center gap-2  mb-2">
          <BookOpen size={18} /> Requirements
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {/* {[
            "Strong proficiency in mathematics at the required tutoring level.",
            "Previous tutoring or teaching experience preferred.",
            "Excellent communication and interpersonal skills.",
            "Reliable internet connection and a suitable remote work environment.",
            "Passion for education and helping students succeed.",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-blue-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))} */}
          {required_skills.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-blue-600 mt-0.5" />
              <span>{item}</span>
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
