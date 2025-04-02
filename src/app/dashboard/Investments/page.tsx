import InvestmentOverview from "@/components/investments/InvestmentOverview";
import MonthlyRevenue from "@/components/investments/MonthlyRevenue";
import YearlyTotalInvestments from "@/components/investments/YearlyTotalInvestments";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col gap-7">
      <InvestmentOverview />
      <div className="flex flex-col gap-[5rem] lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
        <YearlyTotalInvestments />
        <MonthlyRevenue />
      </div>
    </div>
  );
}
