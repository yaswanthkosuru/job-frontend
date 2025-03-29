"use client"
import CandidateForm from '@/components/candidates/CandidateForm'
import { createCandidate } from '@/features/candidate/CandidateSlice'
import React from 'react' 
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

const SignupCandidatePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = async (data: any) => {
    try {
      await dispatch(createCandidate(data))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <CandidateForm onSubmit={handleSubmit} />
  )
}

export default SignupCandidatePage
