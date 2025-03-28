"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { Overview } from "@/types/types";
import { HandCoinsIcon, CoinsIcon, PiggyBankIcon, DollarSign } from "lucide-react";

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

  return (
    <div>
      {overview && (
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 shadow-lg rounded-sm p-6">
            <div className="w-[35px] h-[35px] p-2 rounded-full bg-[#FFF5D9] flex items-center justify-center">
              <DollarSign className="text-[#FFBB38]"/>
            </div>
            <p className="flex flex-col gap-1">
              <span className="text-[#718EBF]">My Balance</span>
              <span className="font-semibold text-xl">${overview.balance.toLocaleString()}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shadow-lg rounded-sm p-6">
            <div className="w-[35px] h-[35px] p-2 rounded-full bg-[#E7EDFF] flex items-center justify-center">
              <HandCoinsIcon className="text-[#396AFF]"/>
            </div>
            <p className="flex flex-col gap-1">
              <span className="text-[#718EBF]">Income</span>
              <span className="font-semibold text-xl">${overview.income.toLocaleString()}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shadow-lg rounded-sm p-6">
            <div className="w-[35px] h-[35px] p-2 rounded-full bg-[#FFE0EB] flex items-center justify-center">
              <CoinsIcon className="text-[#FF82AC]"/>
            </div>
            <p className="flex flex-col gap-1">
              <span className="text-[#718EBF]">Expense</span>
              <span className="font-semibold">${overview.expenses.toLocaleString()}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shadow-lg rounded-sm p-6">
            <div className="w-[35px] h-[35px] p-2 rounded-full bg-[#DCFAF8] flex items-center justify-center">
              <PiggyBankIcon className="text-[#16DBCC]"/>
            </div>
            <p className="flex flex-col gap-1">
              <span className="text-[#718EBF]">Total Saving</span>
              <span className="font-semibold">${overview.total_savings.toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
