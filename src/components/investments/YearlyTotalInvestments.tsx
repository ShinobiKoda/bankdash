"use client";

import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { TotalInvestment } from "@/types/types";
import { PuffLoader } from "react-spinners"; // Import the loader

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  total_investment: {
    label: "Total Investment",
    color: "#FCAA0B", // Matches the line stroke color
  },
} satisfies ChartConfig;

export default function YearlyTotalInvestments() {
  const [totalInvestment, setTotalInvestment] = useState<TotalInvestment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTotalInvestment = async () => {
    try {
      const user = await fetchUserData();
      setTotalInvestment(user.yearly_total_investments);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalInvestment();
  }, []);

  const chartData = totalInvestment;

  return (
    <Card className="w-full max-h-[329px] -ml-6">
      <CardHeader>
        <CardTitle className="font-semibold text-xl text-[#333B69]">
          Yearly Total Investment
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-full my-8">
            <PuffLoader color="#FCAA0B" size={50} /> {/* Loader component */}
          </div>
        ) : chartData.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <ChartContainer config={chartConfig} className="w-full max-h-[329px]">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="5 5" />
              <XAxis
                dataKey="year"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
              />
              <YAxis
                dataKey="total_investment"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="total_investment"
                type="linear"
                stroke="#FCAA0B"
                strokeWidth={2}
                dot={{
                  r: 4,
                  stroke: "#FCAA0B",
                  strokeWidth: 2,
                  fill: "#FFFFFF",
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
