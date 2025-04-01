"use client";

import React from "react";
import { useState, useEffect } from "react";

import { fetchUserData } from "@/lib/api";
import type { TransactionOverview, DailyTransaction } from "@/types/types";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import BarChartLoader from "@/components/charts/BarChartLoader"; // Import the loader

export default function DebitCreditOverview() {
  const [transactionOverview, setTransactionOverview] =
    useState<TransactionOverview | null>(null);
  const [dailyTransactions, setDailyTransactions] = useState<
    DailyTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);

  const getTransactionOverview = async () => {
    try {
      const user = await fetchUserData();
      setTransactionOverview(user.debit_credit_overview);
      setDailyTransactions(user.debit_credit_overview.daily_transactions);
    } catch (error) {
      console.log("Error: ", error);
      throw Error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionOverview();
  }, []);

  const chartConfig = {
    debit: {
      label: "Debits",
      color: "#1A16F3",
    },
    credit: {
      label: "Credits",
      color: "#FCAA0B",
    },
  } satisfies ChartConfig;

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="font-semibold text-xl text-[#343C6A]">
        Debit & Credit Overview
      </h2>
      <div className="flex items-center justify-between">
        <p className=" hidden lg:block">
          ${transactionOverview?.weekly_debit}{" "}
          <span className="text-[#718EBF]">Debited & </span> $
          {transactionOverview?.weekly_credit}{" "}
          <span className="text-[#718EBF]">Credited this week</span>.
        </p>
        <div className="flex gap-2 items-center justify-end">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#1A16F3] rounded-[4px]"></div>
            <span>Debit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#FCAA0B] rounded-[4px]"></div>
            <span>Credit</span>
          </div>
        </div>
      </div>

      {loading ? (
        <BarChartLoader /> // Show loader while loading
      ) : (
        dailyTransactions.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] max-h-[400px] ml-[-1rem]"
          >
            <BarChart
              key={dailyTransactions.length} // Add a unique key to ensure consistent rendering
              accessibilityLayer
              data={dailyTransactions}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => value.slice(0, 3)}
              />
             
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="debit" fill="#1A16F3" radius={10} barSize={30} />
              <Bar dataKey="credit" fill="#FCAA0B" radius={10} barSize={30} />
            </BarChart>
          </ChartContainer>
        )
      )}
    </section>
  );
}
