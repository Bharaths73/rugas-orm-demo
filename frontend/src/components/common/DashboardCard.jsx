import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function DashboardCard({field,value}) {
    if (field === "orders") return null;

    return (
      <Card className='flex flex-col px-1 gap-y-3 bg-gray-100 shadow-black shadow-xl rounded-2xl border-gray-100 border-4 drop-shadow-xl hover:bg-white hover:border-white cursor-pointer'>
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{value}</CardTitle>
          <CardDescription className='text-base'>{field.replace(/_/g, ' ').toUpperCase()}</CardDescription>
        </CardHeader>
      </Card>
    );
}

export default DashboardCard