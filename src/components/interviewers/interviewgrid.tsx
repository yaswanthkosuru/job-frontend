
import { InterviewerProfile } from "@/types/users";
import InterviewerCard from "./InterviewCard";

interface InterviewerGridProps {
  interviewers: InterviewerProfile[];
}

const InterviewerGrid = ({ interviewers }: InterviewerGridProps) => {
  if (!interviewers || interviewers.length === 0) {
    return <div>No interviewers found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interviewers.map((interviewer) => (
        <InterviewerCard 
          key={interviewer.user.email} 
          interviewer={interviewer} 
        />
      ))}
    </div>
  );
};

export default InterviewerGrid;
