"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchUserData } from "@/lib/api";
import type { Activity } from "@/types/types";
import BarChartLoader from "@/components/charts/BarChartLoader"; // Import the loader

export default function WeeklyActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getUserActivity = async () => {
    try {
      const user = await fetchUserData();
      setActivities(user.weekly_activities);
    } catch (error) {
      console.log("Failed to fetch user activities", error);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    getUserActivity();
  }, []);

  const chartConfig = {
    deposit: {
      label: "Deposits",
      color: "#16a34a",
    },
    withdrawal: {
      label: "Withdrawal",
      color: "#dc2626",
    },
  } satisfies ChartConfig;

  return (
    <section className="w-full mx-auto flex flex-col gap-1">
      <h2 className="font-semibold text-xl text-[#343C6A]">Weekly Activity</h2>
      <div className="flex gap-2 w-full items-center justify-end">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-[#16DBCC] rounded-full"></div>
          <span>Deposit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-[#1814F3] rounded-full"></div>
          <span>Withdraw</span>
        </div>
      </div>
      {loading ? (
        <BarChartLoader /> // Show loader while loading
      ) : (
        activities.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] max-h-[400px] ml-[-2rem]"
          >
            <BarChart
              key={activities.length} // Add a unique key to ensure consistent rendering
              accessibilityLayer
              data={activities}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="withdrawal" fill="#1814F3" radius={4} />
              <Bar dataKey="deposit" fill="#16DBCC" radius={4} />
            </BarChart>
          </ChartContainer>
        )
      )}
    </section>
  );
}
