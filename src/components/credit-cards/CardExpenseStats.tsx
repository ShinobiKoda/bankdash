"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PulseLoader } from "react-spinners";

import { fetchUserData } from "@/lib/api";
import type { CardExpense } from "@/types/types";
import { useState, useEffect } from "react";

const chartConfig = {
  card_expenses: {
    label: "Card Expenses",
    color: "hsl(var(--chart-1))",
  },
  total_income: {
    label: "Total Income",
    color: "hsl(var(--chart-2))",
  },
  total_balance: {
    label: "Total Balance",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function CardExpenseStats() {
  const [cardExpense, setCardExpense] = useState<CardExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCardExpenses = async () => {
    try {
      const user = await fetchUserData();
      setCardExpense(user.card_expenses);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardExpenses();
  }, []);

  const id = "pie-interactive";
  const [activeCard, setActiveCard] = React.useState("");

  useEffect(() => {
    if (cardExpense.length > 0 && !activeCard) {
      setActiveCard(cardExpense[0].card_number);
    }
  }, [cardExpense, activeCard]);

  const activeIndex = React.useMemo(
    () => cardExpense.findIndex((item) => item.card_number === activeCard),
    [activeCard, cardExpense]
  );
  const cards = React.useMemo(
    () => cardExpense.map((_, index) => `Card ${index + 1}`),
    [cardExpense]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-center justify-between w-full">
        <CardTitle className="font-semibold text-xl text-[#343C6A]">
          Card Expense Stats
        </CardTitle>
        {!loading && (
          <Select value={activeCard} onValueChange={setActiveCard}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select card" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {cards.map((label, index) => {
                const colors = ["#FFBB38", "#16DBCC", "#4C78FF"];
                return (
                  <SelectItem
                    key={label}
                    value={cardExpense[index]?.card_number}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      />
                      {label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 justify-center items-center pb-0">
        {loading ? (
          <PulseLoader color="#4C78FF" size={10} className="my-[4rem]" />
        ) : (
          cardExpense.length > 0 && (
            <ChartContainer
              id={id}
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={cardExpense}
                  dataKey="total_expense"
                  nameKey="bank"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 25}
                        innerRadius={outerRadius + 12}
                      />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              }).format(
                                cardExpense[activeIndex]?.total_expense || 0
                              )}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Expense
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          )
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {cardExpense.map((card) => (
          <div key={card.card_number} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: card.fill }}
            ></div>
            <span className="text-sm font-medium">{card.bank}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
