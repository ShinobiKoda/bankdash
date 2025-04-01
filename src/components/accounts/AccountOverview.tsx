"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { Overview } from "@/types/types";
import {
  BanknoteIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PiggyBankIcon,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function AccountOverview() {
  const [overview, setOverview] = useState<Overview | null>(null);

  const getUserOverview = async () => {
    try {
      const user = await fetchUserData();
      setOverview(user.account_overview);
    } catch (error) {
      console.log("Failed to fetch user overview", error);
    }
  };

  useEffect(() => {
    getUserOverview();
  }, []);

  const overview_stats = [
    {
      icon: <BanknoteIcon className="text-[#FFBB38]" />,
      label: "My Balance",
      value: overview?.balance.toLocaleString(),
      color: "#FFF5D9",
      bgColor: "#FFF5D9",
    },
    {
      icon: <TrendingUpIcon className="text-[#396AFF]" />,
      label: "Income",
      value: overview?.income.toLocaleString(),
      color: "#E7EDFF",
      bgColor: "#E7EDFF",
    },
    {
      icon: <TrendingDownIcon className="text-[#FF82AC]" />,
      label: "Expense",
      value: overview?.expenses.toLocaleString(),
      color: "#FFE0EB",
      bgColor: "#FFE0EB",
    },
    {
      icon: <PiggyBankIcon className="text-[#16DBCC]" />,
      label: "Total Saving",
      value: overview?.total_savings.toLocaleString(),
      color: "#DCFAF8",
      bgColor: "#DCFAF8",
    },
  ];

  return (
    <div>
      {!overview ? (
        <div className="w-full grid grid-cols-2 gap-4 lg:flex lg:items-center lg:justify-between">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-[1rem] lg:px-[3rem] px-3 rounded-[25px] shadow-md"
              >
                <Skeleton className="rounded-full min-w-[40px] min-h-[40px] lg:min-w-[70px] lg:min-h-[70px]" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-4 lg:flex lg:items-center lg:justify-between">
          {overview_stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-[1rem] lg:px-[3rem] px-3 rounded-[25px] shadow-md"
            >
              <div
                className="ounded-full min-w-[40px] min-h-[40px] lg:min-w-[70px] lg:min-h-[70px] flex items-center justify-center text-2xl rounded-full"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-[#718EBF]">{stat.label}</h3>
                <p className="text-xl font-bold">${stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
