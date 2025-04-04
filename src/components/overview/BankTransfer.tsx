"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import type { Transfer } from "@/types/types"
import { fetchUserData } from "@/lib/api"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useState, useEffect } from "react"


import BarChartLoader from "@/components/charts/BarChartLoader"; // Import BarChartLoader


export default function BankTransfer() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const getUserTransfers = async() => {
    try{
      const user = await fetchUserData();
      setTransfers(user.money_transfers);
    }catch(error){
      console.log("Failed to fetch data", error);
    }
  }

  useEffect(() => {
    getUserTransfers();
  }, []);

  const chartData = transfers;

  const chartConfig = {
    amount_transferred: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig


  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-semibold text-xl text-[#343C6A]">Bank Transfer</h2>
      <Card className="w-full">
      <CardContent className="w-full -ml-12">
      {chartData.length > 0 ? (
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
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
            <YAxis 
              axisLine={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount_transferred"
              type="natural"
              stroke="#1814F3"
              strokeWidth={5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <BarChartLoader />
      )}
      </CardContent>
    </Card>
    </section>
  )
}
