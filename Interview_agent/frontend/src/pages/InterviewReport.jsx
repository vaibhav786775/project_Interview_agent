import React, { useEffect, useState } from 'react'
import Step3report from '../components/interview/Step3report'
import { useNavigate, useParams } from 'react-router-dom'
import { getInterview } from '../apis/interview.api'

function InterviewReport({user, setUser}) {
  const {id} = useParams()
    const [loading , setLoading] = useState(true)
    const [report,setReport] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchReport = async () => {
            const response = await getInterview(id)
            const data = response?.interview
            if(data.status !== "completed"){
                navigate(`/interview/${id}`,
                    {replace: true});
                    return;
            }
            setReport(data)
            setLoading(false)
         }

         fetchReport()

    },[id,navigate])

    if(loading){
        return(
            <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin shadow-[0_0_20px_rgba(103,232,249,0.3)]" />
              <span className="font-mono text-xs text-slate-400">Compiling Mission Debrief...</span>
            </div>
        )
    }
    if(!report) return null


  return (
   <Step3report
   user={user}
   setUser={setUser}
   report={report}
   />
  )
}

export default InterviewReport
