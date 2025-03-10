"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { fetchUserData } from "@/lib/api";
import type { Activity } from "@/types/types"; 



export default function WeelyActivity() {

  const [activities, setActivities] = useState<Activity[]>([]);

  const getUserActivity = async() => {
    try{
      const user = await fetchUserData();
      setActivities(user.weekly_activities);
    }catch(error){
      console.log("Failed to fetch user activities");
      return [];
    }
  }

  useEffect(()=> {
    getUserActivity();
  }, []);

  const chartConfig = {
    deposits: {
      label: "Deposits",
      color: "#16a34a",
    },
    withdrawal: {
      label: "Withdrawal",
      color: "#dc2626",
    },
  } satisfies ChartConfig;


  return (
    <section className="w-full max-w-[600px] mb-[30rem] mx-auto">
      <h2 className="font-semibold text-xl text-[#343C6A] mb-[3rem]">Weekly Activity</h2>
      {activities.length > 0 && (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={activities}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)} // Abbreviate days
            />
            <YAxis tickLine={true} tickMargin={10} axisLine={true} />
            <Bar dataKey="withdrawal" fill="#1814F3" radius={4} />
            <Bar dataKey="deposit" fill="#16DBCC" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </section>
  );
}
