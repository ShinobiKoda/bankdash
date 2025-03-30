"use client";

import { LabelList, Pie, PieChart } from "recharts";
import { fetchUserData } from "@/lib/api";
import type { ExpenseItem } from "@/types/types";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

import { Card, CardContent } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useEffect, useState } from "react";

export default function ExpenseStats() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getUserExpenses = async () => {
    try {
      const user = await fetchUserData();
      setExpenses(user.expense_stats);
    } catch (error) {
      console.log("Failed to fetch the user expenses", error);
      return {};
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getUserExpenses();
  }, []);

  const chartConfig = {
    catergory: {
      label: "Category",
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
    <div className="max-h-[400px]">
      <Card className="flex flex-col">
        <h2 className="font-semibold text-xl text-[#343C6A]">
          Expense Statistics
        </h2>
        {loading ? (
          <div className="flex items-center justify-center flex-1 my-8">
            <ClipLoader color="#4C49ED" size={50} />
          </div>
        ) : (
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[450px] [&_.recharts-text]:fill-background"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="category" hideLabel />}
                />
                <Pie
                  data={expenses}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  paddingAngle={4}
                >
                  <LabelList
                    dataKey="category"
                    angle={39}
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
        )}
      </Card>
    </div>
  );
}
