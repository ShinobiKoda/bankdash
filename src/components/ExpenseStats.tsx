"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { fetchUserData } from "@/lib/api";
import type { ExpenseItem } from "@/types/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useEffect, useState } from "react";

export default function ExpenseStats() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  const getUserExpenses = async () => {
    try {
      const user = await fetchUserData();
      setExpenses(user.expense_stats);
    } catch (error) {
      console.log("Failed to fetch the user expenses", error);
      return {};
    }
  };

  useEffect(() => {
    getUserExpenses();
  }, []);

  const chartData = expenses;

  const chartConfig = {
    catergory: {
      label: "Category"
    },
    entertainment: {
      label: "Entertainment",
      color: "#343C6A",
    },
    investment: {
      label: "Investment",
      color: "#FA00FF",
    },
    others: {
      label: "Others",
      color: "#1814F3",
    },
    bill_expense: {
      label: "Bills",
      color: "#FC7900",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-[#343C6A] font-semibold text-2xl">
        Expense Statistics
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="">
              <LabelList
                dataKey="category"
                className="fill-background font-bold text-lg"
                stroke="none"
                fontSize={12}
                position="inside"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
  
    </Card>
  );
}
