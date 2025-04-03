"use client"
import { AppDispatch } from "@/app/store";
import ProfileCard from "@/components/candidates/CandidateProfile";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createInterviewer, fetchInterviewers } from "@/features/interviewer/InterviewerSlice";
import { useInterviewerSelector } from "@/features/interviewer/InterviewerSlice";
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
import InterviewerForm from "@/components/candidates/InterviewerForm";
import InterviewerGrid from "@/components/interviewers/interviewgrid";

export default function InterviewersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const interviewersData = useInterviewerSelector();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      await dispatch(createInterviewer(data))
      setIsDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dispatch(fetchInterviewers());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser.id);
        } catch (error) {
          console.error("Error parsing user:", error);
        }
      }
    }
  }, []);


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interviewers</h1>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search interviewers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Add Interviewer</Button>
      </div>

      <InterviewerGrid interviewers={interviewersData.interviewers} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Interviewer</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
            <InterviewerForm onSubmit={handleSubmit} defaultValues={{added_by_id: userId as number}}/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
