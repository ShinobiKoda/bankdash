import CardSection from "@/components/overview/CardSection";
import ExpenseStats from "@/components/overview/ExpenseStats";
import QuickTransfer from "@/components/overview/QuickTransfer";
import RecentTransaction from "@/components/overview/RecentTransaction";
import WeelyActivity from "@/components/overview/WeelyActivity";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr]">
        <CardSection />
        <RecentTransaction />
      </div>
      <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr]">
        <WeelyActivity />
        <ExpenseStats />
      </div>
      <div className="w-full">
        {/* <QuickTransfer /> */}
      </div>
    </div>
  );
}
