"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { UnitTransaction } from "@/types/types";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<UnitTransaction[]>([]);

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

  return (
    <section className="flex flex-col gap-7 w-full">
      <h2>Recent Transactions</h2>
      <div className="flex flex-col gap-5">
        {transactions &&
          transactions.map((transaction, index) => {
            let icon;
            let color;
            let sign;
            if(transaction.type === "debit"){
              icon = <ArrowUp />
              color = "#FE5C73"
              sign = "-"
            }else{
              icon = <ArrowDown />
              sign = "+"
              color = "#16DBAA";
            }

            return (
              <div
                key={index}
                className="flex gap-3 items-center w-full justify-between"
              >
                <div className="flex gap-3 items-center">
                  <div className="border w-10 h-10 rounded-full flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p>{transaction.description}</p>
                    <p>
                      <span>
                        {transaction.date}, {transaction.time}
                      </span>
                    </p>
                  </div>
                </div>
                <p className={`text-[${color}] font-medium`}>{sign}{transaction.amount}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}
