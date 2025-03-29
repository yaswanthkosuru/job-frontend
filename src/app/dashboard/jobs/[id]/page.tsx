"use client"

import { useParams } from "next/navigation"
import { useJobPostingById } from "@/features/jobposting/jobpostingSlice"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store"
import { fetchJobPostings } from "@/features/jobposting/jobpostingSlice"
import type { CandidateProfile } from "@/types/users"
import { createJobApplication } from "@/features/jobapplicants/jobapplicantslice"
import SelectCandidate from "@/components/candidates/SelectCandidate"
import ApplicationBoard from "@/components/board/kanbanboard"
import { Briefcase, MapPin, IndianRupeeIcon, Building, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function JobPostingPage() {
  const { id } = useParams<{ id: string }>()
  const jobPosting = useJobPostingById(Number(id))
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSelector((state: RootState) => state.jobposting)
  const [isClient, setIsClient] = useState(true)

  useEffect(() => {
    if (!jobPosting) {
      dispatch(fetchJobPostings())
    }
  }, [dispatch, jobPosting])

  useEffect(() => {
    setIsClient(false)
  }, [])
  if (isClient) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-8 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (!jobPosting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-8 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  const formatEmploymentType = (type: string) => {
    return type
      ?.replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const handleAddCandidate = async(candidateIds: number[]) => {

    await dispatch(createJobApplication({jobposting_id: jobPosting?.id as number, candidate_ids: candidateIds}))
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8 border-none shadow-md">
          <CardHeader className=" pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">{jobPosting?.title}</h1>
              <Button
                className=" hover:/90 text-white shadow-sm transition-all"
                onClick={() => setOpen(true)}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{jobPosting?.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{jobPosting?.location || "Remote"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IndianRupeeIcon className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Salary</h3>
                    <p className="text-gray-600">{jobPosting?.salary || "Competitive"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Department</h3>
                    <p className="text-gray-600">{jobPosting?.department || "General"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Employment Type</h3>
                    <p className="text-gray-600">{formatEmploymentType(jobPosting?.employment_type) || "Full-time"}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-md p-6">
          <ApplicationBoard />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] sm:max-w-2xl overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Add Candidate to {jobPosting?.title}</DialogTitle>
          </DialogHeader>
          <SelectCandidate
            onSelectedCandidates={handleAddCandidate}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

