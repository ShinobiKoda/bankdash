"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { UnitTransaction } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FaUser, FaRecycle, FaScrewdriver } from "react-icons/fa";

export default function LastTransaction() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<UnitTransaction[]>([]);

  const getUserTransactions = async () => {
    try {
      const user = await fetchUserData();
      setTransactions(user.all_transactions);
    } catch (error) {
      console.log("Failed to fetch user transactions", error);
    }
  };

  useEffect(() => {
    getUserTransactions();
    setLoading(false);
  }, []);

  const styles = [
    {
      icon: <FaUser className="text-[#FF82AC] text-2xl" />,
      bgcolor: "#FFE0EB",
    },
    {
      icon: <FaRecycle className="text-[#16DBCC] text-2xl" />,
      bgcolor: "#DCFAF8",
    },
    {
      icon: <FaScrewdriver className="text-[#396AFF] text-2xl" />,
      bgcolor: "#E7EDFF",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Last Transaction</h2>
      <div className="flex flex-col gap-5">
        {transactions.slice(0, 3).map((transaction, index) => {
          const color = transaction.type === "debit" ? "#FE5C73" : "#16DBAA";
          const sign = transaction.type === "debit" ? "-" : "+";

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-[45px] h-[45px] rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: styles[index].bgcolor }}
                >
                  {styles[index].icon}
                </div>
                <p className="flex flex-col gap-1">
                  <span className="text-[#333B69] font-medium">{transaction.description}</span>
                  <span className="text-[#718EBF]">{transaction.date}</span>
                </p>
              </div>
              <p className="" style={{color: color}}>{sign}${transaction.amount}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
