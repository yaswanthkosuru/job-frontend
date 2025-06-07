import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  FileText,
  Sparkles,
} from "lucide-react";
import { CandidateProfile } from "@/types/userstype";
import { getAvatarUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { generateAIAnalysis, selectLLMState } from "@/features/llm/llmslice";

const CandidateProfileCard = ({ user }: { user: CandidateProfile }) => {
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const llmState = useSelector((state: RootState) => selectLLMState(state));

  const handleAskAI = () => {
    setIsAiDialogOpen(true);
    dispatch(generateAIAnalysis({ candidate_id: user.id }));
  };

  return (
    <div>
      <Card className="relative max-w-lg mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-50 to-zinc-100 text-gray-900 rounded-xl shadow-md transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-105"
              onClick={handleAskAI}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold text-sm">Ask AI</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Summary for {user.user.username}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto max-h-[80vh] p-4">
              {llmState.status === "loading" && (
                <div className="text-center py-4">
                  <span className="text-gray-500">Summarising Details...</span>
                </div>
              )}
              {llmState.status === "failed" && (
                <div className="text-center py-4 text-red-500">
                  Failed to summarize details. Please try again.
                </div>
              )}
              {llmState.status === "succeeded" && (
                <pre className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-md">
                  {llmState.content}
                </pre>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={getAvatarUrl(user.user.email)}
              alt={user.user.username}
            />
            <AvatarFallback>{user.user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">{user.user.username}</h2>
          <p className="text-gray-500">
            {user.job_title} at {user.company}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <a href={`mailto:${user.user.email}`}>
                <Mail className="mr-2" size={16} />
                Email
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`tel:${user.user.phone}`}>
                <Phone className="mr-2" size={16} />
                Call
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={user.linkedin_profile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2" size={16} />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={user.github_profile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2" size={16} />
                GitHub
              </a>
            </Button>
          </div>
          <div className="mt-4 w-full">
            <Button className="mt-4 w-full" asChild>
              <a
                href={user.resume_file_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2" size={16} />
                View Resume
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateProfileCard;
