import CardSection from "@/components/overview/CardSection";
import ExpenseStats from "@/components/overview/ExpenseStats";
import QuickTransfer from "@/components/overview/QuickTransfer";
import RecentTransaction from "@/components/overview/RecentTransaction";
import WeelyActivity from "@/components/overview/WeelyActivity";
import BankTransfer from "@/components/overview/BankTransfer";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[3fr_1fr] w-full">
        <CardSection />
        <RecentTransaction />
      </div>
      <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-[3fr_1fr]">
        <WeelyActivity />
        <ExpenseStats />
      </div>
      <div className="w-full flex flex-col gap-8 lg:grid lg:grid-cols-2">
        <QuickTransfer />
        <BankTransfer />
      </div>
    </div>
  );
}
