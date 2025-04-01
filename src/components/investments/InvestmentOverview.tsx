"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { Investment } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

import { FaDollarSign, FaChartLine, FaPercentage } from "react-icons/fa";

export default function InvestmentOverview() {
  const [investment, setInvestment] = useState<Investment>({} as Investment);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserInvestment = async () => {
    try {
      const user = await fetchUserData();
      setInvestment(user.investments_overview);
    } catch (error) {
      console.log("Eror: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInvestment();
  }, []);

  const investmentData = [
    {
      icon: <FaDollarSign className="text-[#16DBCC] text-xl" />,
      bgcolor: "#DCFAF8",
      description: "Total Invested amount",
      amount: `$${investment?.total_investment?.toLocaleString("en-US") ?? 0}`,
    },
    {
      icon: <FaChartLine className="text-[#FF82AC] text-xl" />,
      bgcolor: "#FFE0EB",
      description: "Number of Investments",
      amount: `${
        investment?.number_of_investments?.toLocaleString("en-US") ?? 0
      }`,
    },
    {
      icon: <FaPercentage className="text-[#396AFF] text-xl" />,
      bgcolor: "#E7EDFF",
      description: "Rate of Return",
      amount: `+${investment?.rate_of_return ?? 0}%`,
    },
  ];

  return (
    <section className="w-full flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-6 shadow-lg rounded-xl p-4 lg:px-10"
              >
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-20 h-6" />
                </div>
              </div>
            ))
        : investmentData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 shadow-lg rounded-xl p-4 lg:px-10"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.bgcolor }}
              >
                {item.icon}
              </div>
              <p className="flex flex-col gap-2">
                <span className="text-[#718EBF]">{item.description}</span>
                <span className="font-semibold text-xl">{item.amount}</span>
              </p>
            </div>
          ))}
    </section>
  );
}
