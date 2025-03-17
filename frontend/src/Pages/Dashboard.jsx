import DashboardCard from '@/components/common/DashboardCard'
import { getDashboardDetailsBackend } from '@/Services/operations/Dashboard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
  const [details,setDetails]=useState({})
  const token=useSelector((state)=>state.auth.token)

  const getDashBoardDetails=async()=>{
    const result=await getDashboardDetailsBackend(token)
    if(result){
       setDetails(result)
    }
  }

  useEffect(()=>{
    getDashBoardDetails()
  },[])
  return (
    <div className="w-full min-h-screen mt-20">
      <div className="w-11/12 mx-auto mt-5 flex flex-col gap-y-5">
      <h1 className='font-bold text-2xl'>Dashboard</h1>
         <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
           {
                Object.entries(details).map(([key, value], index) => (
                  <DashboardCard key={index} field={key} value={value} />
                ))
           }
         </div>
      </div>
    </div>
  )
}

export default Dashboard