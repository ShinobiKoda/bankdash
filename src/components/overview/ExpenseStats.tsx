"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { fetchUserData } from "@/lib/api";
import type { ExpenseItem } from "@/types/types";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex flex-col">
        <h2 className="font-semibold text-xl text-[#343C6A]">Expense Statistics</h2>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="category"
              cx="50%" cy="50%" outerRadius={110}
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
                    chartConfig[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
