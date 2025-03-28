"use client";

import React, { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { UnitTransaction } from "@/types/types";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<UnitTransaction[]>([]);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const getUserTransaction = async () => {
    try {
      const user = await fetchUserData();
      setTransactions(user.all_transactions);
    } catch (error) {
      console.log("Failed to fetch user transaction", error);
    }
  };

  useEffect(() => {
    getUserTransaction();
  }, []);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) =>
          filter === "income"
            ? transaction.type === "credit"
            : transaction.type === "debit"
        );

  return (
    <section className="flex flex-col gap-7 w-full">
      <h2 className="font-semibold text-lg">Recent Transactions</h2>
      <div className="flex gap-3 items-center justify-between font-medium">
        <p
          className={`pb-3 border-b-2 transition-all duration-300 ${
            filter === "all"
              ? "text-[#1814F3] border-b-[#1814F3]"
              : "text-[#718EBF] border-b-transparent"
          }`}
          onClick={() => setFilter("all")}
        >
          All Transactions
        </p>
        <p
          className={`pb-3 border-b-2 transition-all duration-300 ${
            filter === "income"
              ? "text-[#1814F3] border-b-[#1814F3]"
              : "text-[#718EBF] border-b-transparent"
          }`}
          onClick={() => setFilter("income")}
        >
          Income
        </p>
        <p
          className={`pb-3 border-b-2 transition-all duration-300 ${
            filter === "expense"
              ? "text-[#1814F3] border-b-[#1814F3]"
              : "text-[#718EBF] border-b-transparent"
          }`}
          onClick={() => setFilter("expense")}
        >
          Expense
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {filteredTransactions.map((transaction, index) => {
          let icon;
          let color;
          let sign;
          if (transaction.type === "debit") {
            icon = <ArrowUp className="w-[20px] hover:opacity-90" />;
            color = "#FE5C73";
            sign = "-";
          } else {
            icon = <ArrowDown className="w-[20px] hover:opacity-90" />;
            sign = "+";
            color = "#16DBAA";
          }

          return (
            <div
              key={index}
              className="flex gap-3 items-center w-full justify-between hover:opacity-90 cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <div className="border w-[35px] h-[35px] rounded-full flex items-center justify-center border-[#718EBF] text-[#718EBF]">
                  {icon}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-[#718EBF]">
                    {transaction.date}, {transaction.time}
                  </p>
                </div>
              </div>
              <p className="font-medium" style={{ color }}>
                {sign}
                {transaction.amount}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
