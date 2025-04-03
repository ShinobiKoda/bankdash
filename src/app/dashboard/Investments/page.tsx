import InvestmentOverview from "@/components/investments/InvestmentOverview";
import MonthlyRevenue from "@/components/investments/MonthlyRevenue";
import YearlyTotalInvestments from "@/components/investments/YearlyTotalInvestments";
import UserInvestment from "@/components/investments/UserInvestment";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col lg:gap-[4rem] gap-4">
      <InvestmentOverview />
      <div className="flex flex-col lg:gap-[5rem] lg:grid lg:grid-cols-2 gap-4 md:gap-[4rem] lg:items-start">
        <YearlyTotalInvestments />
        <MonthlyRevenue />
      </div>
      <div className="w-full flex flex-col gap-4 lg:mt-8 md:mt-[4rem] lg:grid lg:grid-cols-[2fr_1fr]">
        <UserInvestment />
      </div>
    </div>
  );
}
