import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCandidateSelector } from "@/features/candidate/CandidateSlice";
import { getAvatarUrl } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchCandidates } from "@/features/candidate/CandidateSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

interface SelectCandidateProps {
  onSelectedCandidates: (candidateIds: number[]) => void;
}

const SelectCandidate = ({ onSelectedCandidates }: SelectCandidateProps) => {
  const { candidates, status } = useCandidateSelector();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(fetchCandidates({jobposting_id: Number(id) }));
  }, [dispatch]);

  const toggleCandidate = (candidateId: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId);
    } else {
      newSelected.add(candidateId);
    }
    setSelectedIds(newSelected);
  };

  const handleAddCandidates = () => {
    const selectedArray = Array.from(selectedIds);
    onSelectedCandidates(selectedArray);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Select Candidates</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedIds.size} selected
          </span>
          {selectedIds.size > 0 && (
            <Button 
              onClick={handleAddCandidates} 
              className="bg-primary text-white hover:bg-primary/90"
            >
              Add Candidates
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {status === "succeeded" &&
          candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`flex overflow-hidden items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedIds.has(candidate.id) ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
              }`}
              onClick={() => toggleCandidate(candidate.id)}
            >
              <Avatar>
                <AvatarImage src={getAvatarUrl(candidate.user.email)} alt={candidate.user.username} />
                <AvatarFallback>{candidate.user.username[0]}</AvatarFallback>
              </Avatar>
              <span className="ml-4 flex-1">{candidate.user.email}</span>
              {selectedIds.has(candidate.id) && (
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
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 013.296-1.043 3.746 3.746 0 013.296 1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectCandidate;
