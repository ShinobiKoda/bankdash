"use client";

import React, { useEffect } from "react";
import { useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  const getUserExpense = async () => {
    try {
      setError(null); // Reset error state
      const user = await fetchUserData();
      setExpense(user.expenses);
    } catch (error) {
      setError("Failed to fetch expenses. Please try again later.");
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

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-semibold text-lg text-[#343C6A]">My Expense</h2>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
