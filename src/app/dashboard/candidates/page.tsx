"use client"
import { AppDispatch } from "@/app/store";
import ProfileCard from "@/components/candidates/CandidateProfile";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCandidate, fetchCandidates } from "@/features/candidate/CandidateSlice";
import { useCandidateSelector } from "@/features/candidate/CandidateSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CandidateForm from "@/components/candidates/CandidateForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CandidatesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { candidates, status } = useCandidateSelector();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);

  // Update filtered candidates when search term changes
  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      const { user, job_title, company, skills } = candidate;
      const searchTerms = searchTerm.toLowerCase();
      
      // Search across multiple fields
      return (
        user.email.toLowerCase().includes(searchTerms) ||
        user.username.toLowerCase().includes(searchTerms) ||
        job_title.toLowerCase().includes(searchTerms) ||
        company.toLowerCase().includes(searchTerms)
      );
    });
    setFilteredCandidates(filtered);
  }, [searchTerm, candidates]);

  // Fetch candidates on initial load
  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="flex items-center justify-center h-screen">Failed to load candidates</div>;
  }

  const handleSubmit = async (data: any) => {
    try {
      await dispatch(createCandidate(data))
      toast.success("Candidate added successfully")
      setIsDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add candidate")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Add Candidate</Button>
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        {filteredCandidates.map((candidate) => (
          <ProfileCard key={candidate.user.email} user={candidate} />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
            <CandidateForm onSubmit={handleSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
