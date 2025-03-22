"use client";

import React, { useEffect, useState } from "react";

import { CreditCard, CoinsIcon } from "lucide-react";
import { fetchUserData } from "@/lib/api";
import type { Transaction } from "@/types/types";

export default function RecentTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getUserTransaction = async () => {
    try {
      const user = await fetchUserData();
      setTransactions(user.recent_transactions);
    } catch (error) {
      console.log("Failed to fetch user data", error);
      return [];
    }
  };

  useEffect(() => {
    getUserTransaction();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#343C6A]z">
        Recent Transaction
      </h2>
      <div className="w-full flex flex-col gap-9">
        {transactions ? (
          transactions.map((transaction, index) => {
            const isDebit = transaction.type === "debit";
            const amountColor = isDebit ? "text-[#FF4B4A]" : "text-[#41D4A8]";
            const amountSign = isDebit ? "-" : "+";
            const iconColor = isDebit ? "#FF4B4A" : "#41D4A8";
            const Icon = isDebit ? CreditCard : CoinsIcon;

            return (
              <div
                className="w-full flex items-center justify-between"
                key={index}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-[#FFF5D9] flex items-center justify-center rounded-full">
                    <Icon color={iconColor} />
                  </div>
                  <p className="flex flex-col">
                    <span className="font-medium">
                      {transaction.description}
                    </span>
                    <span className="text-[#718EBF]">{transaction.date}</span>
                  </p>
                </div>
                <p className={`font-medium ${amountColor}`}>
                  {amountSign}${transaction.amount}
                </p>
              </div>
            );
          })
        ) : (
          <p>No transactions</p>
        )}
      </div>
    </section>
  );
}
