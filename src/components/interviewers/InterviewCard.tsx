
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InterviewerProfile } from "@/types/users";

interface InterviewerCardProps {
  interviewer: InterviewerProfile;
}

const InterviewerCard = ({ interviewer }: InterviewerCardProps) => {
  const { user, job_title, department, years_of_experience, bio, added_by } = interviewer;
  
  // Get initials for avatar
  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12 bg-blue-100 text-blue-600">
              <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-700">{job_title}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{department}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-700">{years_of_experience} years experience</span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 mt-2">
        <div className="w-full space-y-1">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Building className="h-3.5 w-3.5" />
            <span>{added_by.organisation.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{added_by.organisation.location}</span>
            <span className="text-gray-400">•</span>
            <span>{added_by.organisation.industry}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewerCard;