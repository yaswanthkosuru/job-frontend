"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Github, Linkedin, FileText, Mail, Phone, UserPlus } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Application } from "@/types/jobApplicants"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/store"
import { getJobApplicants, scheduleInterview, UpdateStatusofJobApplication, useJobApplicants } from "@/features/jobapplicants/jobapplicantslice"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AdditionalNotes from "./Additionalnotes"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { fetchInterviewers, useInterviewerSelector } from "@/features/interviewer/InterviewerSlice"
import SelectInterviewer from "../candidates/SelectInterviewer"
import { useParams } from "next/navigation"
 
export default function ApplicationBoard() {
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null)
  const [selectedId,setSelectedId] = useState<number | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {id}=useParams()
  const dispatch=useDispatch<AppDispatch>()
  const {jobapplicants:applications,status,error}=useJobApplicants({job_id:Number(id)})
  const {interviewers}=useInterviewerSelector()

  useEffect(()=>{
    if(id){
      dispatch(getJobApplicants({job_id:Number(id)}))
    }
  },[id])

  const statuses = ["pending", "interview", "rejected", "accepted"] as const

  const statusColors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    interview: "bg-blue-100 text-blue-800 border-blue-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    accepted: "bg-green-100 text-green-800 border-green-200",
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatSalary = (salary: string) => {
    const amount = Number.parseFloat(salary)
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(2)} LPA`
    }
    return `₹${amount.toLocaleString()}`
  }
  if (applications.length === 0 && status === 'succeeded') {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Recruitment Dashboard</h1>
        <p className="text-muted-foreground">No applications found</p>
      </div>
    )
  }
  if (status === 'failed') {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Recruitment Dashboard</h1>
        <p className="text-muted-foreground">Failed to load applications</p>
      </div>
    )
  }

  const handleSelectedInterviewers = (userId: number) => {
    dispatch(scheduleInterview({ jobapplicant_id: Number(selectedId), user_id: userId }));
    console.log(userId)
  }




  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Recruitment Dashboard</h1>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How to use?</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Drag to change status</p>
          <p className="text-muted-foreground">Double tap to see candidate details</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statuses.map((status, statusIndex) => (
          <div key={status} className="flex flex-col">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold capitalize">{status}</h2>
              <Badge variant="outline" className="ml-2">
                {applications.filter((app) => app.status === status).length}
              </Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 min-h-[70vh] flex flex-col gap-4" id={String(statusIndex)}>
              {applications
                .filter((app) => app.status === status)
                .map((application) => (
                  <motion.div
                    key={application.id}
                    layoutId={`card-${application.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={(_, info) => {
                      // Calculate which column we're closest to
                      const containerWidth = document.body.clientWidth
                      const columnWidth = containerWidth / statuses.length
                      const targetColumn = Math.floor((info.point.x + window.scrollX) / columnWidth)

                      if (targetColumn >= 0 && targetColumn < statuses.length) {
                        const newStatus = statuses[targetColumn]
                        if (newStatus !== application.status) {
                          
                          dispatch(UpdateStatusofJobApplication({
                            jobapplicant_id: application.id, 
                            status: newStatus,
                            additional_notes: application.additional_notes || ''
                          }))
                          
                        }
                      }
                    }}
                    className="cursor-grab active:cursor-grabbing"
                    onDoubleClick={() => {
                      setSelectedCandidate(application)
                      setIsDetailsOpen(true)
                    }}
                  >
                    <Card
                      className={`p-4 border-l-4 ${statusColors[application.status]} shadow-sm hover:shadow-md transition-shadow`}
                    >
                       
                      <div className="flex items-start gap-3">

                        <div className="flex-1 min-w-0">
                          {
                            application.status === "pending" && (
                              <div onClick={() => {
                                setSelectedId(application.id)
                                setIsDialogOpen(true)}} className={`h-6 w-6 cursor-pointer bg-gray-100 rounded-md flex justify-center items-center ${statusColors[application.status]}`}>
                                <UserPlus />
                              </div>
                            )
                          }
                          <h3 className="font-medium text-base truncate">{application.candidate.user.username}</h3>
                          <p className="text-sm text-muted-foreground truncate">{application.candidate.job_title}</p>

                          <div className="mt-3 flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Applied {formatDate(application.applied_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <div className="space-y-4 overflow-y-auto max-h-[80vh] p-4">
            {selectedCandidate && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">Candidate Profile</DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                          {getInitials(selectedCandidate.candidate.user.username)}
                        </AvatarFallback>
                      </Avatar>

                      <h2 className="text-xl font-bold">{selectedCandidate.candidate.user.username}</h2>
                      <p className="text-muted-foreground">{selectedCandidate.candidate.job_title}</p>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCandidate.candidate.user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCandidate.candidate.user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={selectedCandidate.candidate.linkedin_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={selectedCandidate.candidate.github_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            GitHub Profile
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={selectedCandidate.candidate.resume_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Download Resume
                          </a>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Application Status</h3>
                        <Badge className={`capitalize ${statusColors[selectedCandidate.status]}`}>
                          {selectedCandidate.status}
                        </Badge>
                        <p className="text-sm mt-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Applied on {formatDate(selectedCandidate.applied_at)}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <Tabs defaultValue="details">
                        <TabsList className="mb-4">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="experience">Experience</TabsTrigger>
                          <TabsTrigger value="education">Education</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedCandidate.candidate.skills.map((skill) => (
                                <Badge key={skill.id} variant="outline">
                                  {skill.name}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-2">Job Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-muted/50 p-3 rounded-md">
                                <p className="text-sm text-muted-foreground">Job Type</p>
                                <p>{selectedCandidate.candidate.job_type}</p>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-md">
                                <p className="text-sm text-muted-foreground">Expected Salary</p>
                                <p>{formatSalary(selectedCandidate.candidate.expected_salary)}</p>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-md">
                                <p className="text-sm text-muted-foreground">Notice Period</p>
                                <p>{selectedCandidate.candidate.notice_period} days</p>
                              </div>
                            </div>
                              <div className="bg-muted/50 p-3 rounded-md">
                                <AdditionalNotes selectedCandidate={selectedCandidate} />
                              </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="experience">
                          <div className="border-l-2 border-muted pl-4 py-2">
                            <div className="relative">
                              <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-primary"></div>
                              <h3 className="font-medium">{selectedCandidate.candidate.job_title}</h3>
                              <p className="text-sm">{selectedCandidate.candidate.company}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(selectedCandidate.candidate.start_date)} -{" "}
                                {selectedCandidate.candidate.currently_working
                                  ? "Present"
                                  : selectedCandidate.candidate.end_date
                                    ? formatDate(selectedCandidate.candidate.end_date)
                                    : "N/A"}
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="education">
                          <div className="border-l-2 border-muted pl-4 py-2">
                            <div className="relative">
                              <div className="absolute -left-6 mt-1 h-4 w-4 rounded-full bg-primary"></div>
                              <h3 className="font-medium">{selectedCandidate.candidate.degree}</h3>
                              <p className="text-sm">{selectedCandidate.candidate.institution}</p>
                              <p className="text-xs text-muted-foreground">
                                Graduated {selectedCandidate.candidate.year_of_completion}
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Schedule Interviewer</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
            <SelectInterviewer onSelectedInterviewers={handleSelectedInterviewers} />
            {/* <InterviewerForm onSubmit={handleSubmit} defaultValues={{added_by_id: userId as number}}/> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
