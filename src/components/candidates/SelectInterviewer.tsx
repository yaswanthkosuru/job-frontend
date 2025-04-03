import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInterviewerSelector, fetchInterviewers } from "@/features/interviewer/InterviewerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAvatarUrl } from "@/lib/utils";

interface SelectInterviewerProps {
  onSelectedInterviewers: (userId: number) => void;
}

const SelectInterviewer = ({ onSelectedInterviewers }: SelectInterviewerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { interviewers } = useInterviewerSelector();

  useEffect(() => {
    if (!interviewers || interviewers.length === 0) {
      dispatch(fetchInterviewers());
    }
  }, [dispatch, interviewers]);

  console.log(interviewers,"interviewers")

  const toggleInterviewer = (interviewerId: number) => {
    setSelectedId(interviewerId);
  };

  const handleAddInterviewers = () => {
    if (selectedId !== null) {
      onSelectedInterviewers(selectedId);
      setSelectedId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Select Interviewers</h2>
        <div className="flex items-center gap-2">
          {selectedId !== null && (
            <Button onClick={handleAddInterviewers} className="bg-primary text-white hover:bg-primary/90">
             Schedule interview
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {interviewers.map((interviewer) => (
          <div
            key={interviewer.user.id}
            className={`flex overflow-hidden items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedId === interviewer.user.id ? "bg-primary/10 border-primary" : "bg-white hover:bg-muted/50"
            }`}
            onClick={() => setSelectedId(interviewer.user.id)}
          >
            <Avatar>
              <AvatarImage src={interviewer.user.email ? getAvatarUrl(interviewer.user.email) : ""} alt={interviewer.user.username || "User"} />
              <AvatarFallback>{interviewer.user.username?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium">{interviewer.user.username || "Unknown User"}</span>
                  <p className="text-sm text-muted-foreground mt-1">{interviewer.user.email || "No Email"}</p>
                </div>
                {selectedId === interviewer.user.id && (
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 013.296-1.043 3.746 3.746 0 013.296 1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectInterviewer;
