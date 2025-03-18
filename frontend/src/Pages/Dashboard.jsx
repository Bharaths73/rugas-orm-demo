import DashboardCard from '@/components/common/DashboardCard'
import { getDashboardDetailsBackend } from '@/Services/operations/Dashboard'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getAllOrders } from '@/Services/operations/OrdersApi'
import { Skeleton } from "@/components/ui/skeleton"


function Dashboard() {
  const [details,setDetails]=useState({})
  const token=useSelector((state)=>state.auth.token)
  const {orders}=useSelector((state)=>state.orders)
  const dispatch=useDispatch()

  const chartData = [];

  orders.forEach((order) => {
    const existing = chartData.find((item) => item.status === order.status)
    if (existing) {
      existing.value++
    } else {
      chartData.push({ status: order.status, value: 1 })
    }
  })

  const chartConfig = {
    delivered: {
      label: "Delivered",
      color: "hsl(var(--chart-1))",
    },
    cancelled: {
      label: "Cancelled",
      color: "hsl(var(--chart-2))",
    },
    shipped: {
      label: "Shipped",
      color: "hsl(var(--chart-3))",
    },
    placed: {
      label: "Placed",
      color: "hsl(var(--chart-4))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  }

  const getDashBoardDetails=async()=>{
    getAllOrders(dispatch,token)
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
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
          {Object.keys(details).length > 0 ? (
            Object.entries(details).map(([key, value], index) => (
              <DashboardCard key={index} field={key} value={value} />
            ))
          ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-16  bg-gray-300" />
                  <Skeleton className="h-6 bg-gray-300" />
                </div>
              ))   
          )}
        </div>

        <p className="mt-14 mb-2 text-2xl font-semibold">
          Orders Analytics <span>📈</span>
        </p>
        {
           chartData.length > 0 ?
            <ChartContainer config={chartConfig} className="h-60 w-full ">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
              className=""
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="status"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="value" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="value"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={4}
              >
                <LabelList
                  dataKey="status"
                  position="insideLeft"
                  offset={8}
                  className="fill-white"
                  fontSize={15}
                />
                <LabelList
                  dataKey="value"
                  position="right"
                  offset={8}
                  className="fill-foreground font-bold"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
            : <Skeleton className="h-60 w-full bg-gray-300" />
        }
      </div>
    </div>
  );
}

export default Dashboard