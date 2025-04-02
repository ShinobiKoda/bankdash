"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { CreditCard, CoinsIcon } from "lucide-react";
import { fetchUserData } from "@/lib/api";
import type { Transaction } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

export default function RecentTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserTransaction = async () => {
    try {
      const user = await fetchUserData();
      setTransactions(user.recent_transactions);
    } catch (error) {
      console.log("Failed to fetch user data", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTransaction();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increase stagger duration for smoother animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Increase duration for smoother animation
      },
    },
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#343C6A]z">
        Recent Transaction
      </h2>
      <div className="w-full flex flex-col gap-9">
        {loading ? (
          // Skeleton loader while loading
          Array.from({ length: 3 }).map((_, index) => (
            <div
              className="w-full flex items-center justify-between"
              key={`skeleton-${index}`} // Ensure unique and stable keys
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))
        ) : transactions.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-9"
          >
            <AnimatePresence>
              {transactions.map((transaction) => {
                const isDebit = transaction.type === "debit";
                const amountColor = isDebit
                  ? "text-[#FF4B4A]"
                  : "text-[#41D4A8]";
                const amountSign = isDebit ? "-" : "+";
                const iconColor = isDebit ? "#FF4B4A" : "#41D4A8";
                const Icon = isDebit ? CreditCard : CoinsIcon;

                return (
                  <motion.div
                    variants={itemVariants}
                    key={transaction.id} // Use a unique identifier from the transaction
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-[#FFF5D9] flex items-center justify-center rounded-full">
                        <Icon color={iconColor} />
                      </div>
                      <p className="flex flex-col">
                        <span className="font-medium">
                          {transaction.description}
                        </span>
                        <span className="text-[#718EBF]">
                          {transaction.date}
                        </span>
                      </p>
                    </div>
                    <p className={`font-medium ${amountColor}`}>
                      {amountSign}${transaction.amount}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p>No transactions</p>
        )}
      </div>
    </section>
  );
}
