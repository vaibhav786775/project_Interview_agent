import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInterview } from '../apis/interview.api'
import Step2interview from '../components/interview/Step2interview'

function InterviewPage({ user }) {
    const {id} = useParams()
    const [loading , setLoading] = useState(true)
    const [interview,setInterview] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchInterview = async () => {
            const response = await getInterview(id)
            const data = response?.interview
            if(data.status === "completed"){
                navigate(`/interview/${id}/report`,
                    {replace: true});
                    return;
            }
            setInterview(data)
            setLoading(false)
         }

         fetchInterview()

    },[id,navigate])

    if(loading){
        return(
            <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin shadow-[0_0_20px_rgba(103,232,249,0.3)]" />
              <span className="font-mono text-xs text-slate-400">Calibrating Simulation Room...</span>
            </div>
        )
    }
    if(!interview) return null
    
    return (
    <Step2interview 
    interviewData={{
        interviewId: interview._id,
        currentQuestion: interview.currentQuestion,
        totalQuestions: interview.questions.length,
        question: interview.questions[interview.currentQuestion],
    }} user={user}    />
  )
}

export default InterviewPage
