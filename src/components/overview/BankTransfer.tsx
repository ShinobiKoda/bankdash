"use client"

import React from 'react'
import type { Transfer } from '@/types/types'
import {useState, useEffect} from 'react';
import { fetchUserData } from '@/lib/api';


import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



export default function BankTransfer() {

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const getUserTransfers = async() => {
    try{
      const user = await fetchUserData();
      setTransfers(user.money_transfers)
    }catch(error){
      console.log("Error fetching transfers", error);
      return[]
    }
  }

  useEffect(()=>{
    getUserTransfers();
  }, [])

  const chartData = transfers;

  const chartConfig = {
    amount_transferred: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  

  return (
      <Card>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={transfers}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="amount_transferred"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
}
