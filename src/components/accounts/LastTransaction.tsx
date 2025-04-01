"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { UnitTransaction } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FaUser, FaRecycle, FaScrewdriver } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

export default function LastTransaction() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<UnitTransaction[]>([]);

  const getUserTransactions = async () => {
    try {
      const user = await fetchUserData();
      setTransactions(user.all_transactions);
    } catch (error) {
      console.log("Failed to fetch user transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTransactions();
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

  const formatCardNumber = (number: string): string => {
    if (!number || number.length < 8) return number; // Handle invalid numbers

    const firstFour = number.slice(0, 4);
    const masked = "**** **** ****"; // Adjust based on total length

    return `${firstFour} ${masked}`;
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="font-semibold text-lg">Last Transaction</h2>
      <div className="flex flex-col gap-5 w-full">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-[45px] h-[45px] rounded-xl" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="hidden lg:block h-4 w-20" />
                <Skeleton className="hidden lg:block h-4 w-28" />
                <Skeleton className="hidden lg:block h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))
          : transactions.slice(0, 3).map((transaction, index) => {
              const color =
                transaction.type === "debit" ? "#FE5C73" : "#16DBAA";
              const sign = transaction.type === "debit" ? "-" : "+";

              return (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-[45px] h-[45px] rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: styles[index].bgcolor }}
                    >
                      {styles[index].icon}
                    </div>
                    <div className="flex flex-col gap-1 w-[150px]">
                      {/* Set a fixed width for description and date */}
                      <span className="text-[#333B69] font-medium truncate">
                        {transaction.description}
                      </span>
                      <span className="text-[#718EBF]">{transaction.date}</span>
                    </div>
                  </div>
                  <p className="hidden text-[#718EBF] lg:block capitalize w-[120px] truncate">
                    {transaction.category}
                  </p>
                  <p className="hidden text-[#718EBF] lg:block w-[150px] truncate">
                    {formatCardNumber(transaction.credit_card_used)}
                  </p>
                  <p className="hidden text-[#718EBF] lg:block capitalize w-[100px] truncate">
                    {transaction.status}
                  </p>
                  <p
                    className="font-medium w-[80px] text-right"
                    style={{ color: color }}
                  >
                    {sign}${transaction.amount}
                  </p>
                </motion.div>
              );
            })}
      </div>
    </section>
  );
}
