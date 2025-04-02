"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchUserData } from "@/lib/api";
import type { MonthlyRevenue } from "@/types/types";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // Import spinner

const chartConfig = {
  revenue: {
    label: "Monthly Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function MonthlyRevenue() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMonthlyRevenue = async () => {
    try {
      const user = await fetchUserData();
      setMonthlyRevenue(user.monthly_revenue);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonthlyRevenue();
  }, []);

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("revenue");
  const total = React.useMemo(
    () => ({
      revenue: monthlyRevenue.reduce(
        (acc, curr) => acc + (curr.revenue || 0),
        0
      ),
    }),
    [monthlyRevenue]
  );

  return (
    <Card className="w-full max-h-[329px] -ml-6">
      <CardHeader>
        <CardTitle className="font-semibold text-xl text-[#333B69]">
          Monthly Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-full my-8">
            <ClipLoader color="#16DBCC" size={50} /> {/* Spinner */}
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className=" max-h-[329px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={monthlyRevenue} // Updated to use monthlyRevenue
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month" // Updated to use "month" from monthlyRevenue
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                minTickGap={32}
                interval={0} // Forces all months to be displayed
                tickFormatter={(value) => value.slice(0, 3)} // Format month to show only first 3 letters
              />
              <YAxis
                dataKey="revenue" // Updated to use "revenue" from monthlyRevenue
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value.toLocaleString()}`} // Format revenue with dollar sign and commas
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="revenue"
                    labelFormatter={(value) => value}
                  />
                }
              />
              <Line
                dataKey="revenue" // Updated to use "revenue" from monthlyRevenue
                type="monotone"
                stroke="#16DBCC" // Updated to use the new color
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
