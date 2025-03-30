"use client";

import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners"; // Import PulseLoader from react-spinners

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { Expense } from "@/types/types";
import { fetchUserData } from "@/lib/api";

export default function Expense() {
  const [expense, setExpense] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getUserExpense = async () => {
    try {
      const user = await fetchUserData();
      setExpense(user.expenses);
    } catch (error) {
      console.log("Failed to fetch user data", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getUserExpense();
  }, []);

  const currentMonth = "January"; // Set the specific month to highlight

  const chartData = expense.map((item) => ({
    ...item,
    fill: item.month === currentMonth ? "var(--color-amount)" : "#E0E0E0", // Highlight the specific month
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#16DBCC",
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <PulseLoader color="#16DBCC" size={15} />{" "}
        {/* Display spinner while loading */}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-semibold text-lg text-[#343C6A]">My Expense</h2>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[300px] w-full ml-[-1rem]"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="amount"
            radius={18}
            barSize={60}
            fill="var(--color-amount)" // Use a static fill color
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
