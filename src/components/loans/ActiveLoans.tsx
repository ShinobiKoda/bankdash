"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { ActiveLoan } from "@/types/types";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function ActiveLoans() {
  const { toast } = useToast();

  const [activeLoans, setActiveLoans] = useState<ActiveLoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getActiveLoans = async () => {
    try {
      const user = await fetchUserData();
      setActiveLoans(user.loan_overview);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const handleRepay = (loanId: number) => {
    toast({
      title: "Repayment Successful",
      description: `You have successfully repaid loan #${loanId}.`,
      variant: "default", // Ensure this matches the supported variants in your toast configuration
      duration: 3000, // Toast will disappear after 3 seconds
    });
  };

  useEffect(() => {
    getActiveLoans();
  }, []);

  return (
    <section className="mt-5">
      <table className="w-full border-collapse shadow-lg rounded-xl">
        <thead>
          <tr className="text-left font-medium text-[#718EBF] border-b">
            <th className="p-3 hidden md:table-cell">SL NO</th>
            <th className="p-3">Loan Money</th>
            <th className="p-3">Left to Repay</th>
            <th className="p-3 hidden md:table-cell">Duration</th>
            <th className="p-3 hidden md:table-cell">Interest Rate</th>
            <th className="p-3 hidden md:table-cell">Installment</th>
            <th className="p-3">Repay</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 hidden md:table-cell">
                    <Skeleton className="h-6 w-12" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-6 w-24" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-6 w-24" />
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <Skeleton className="h-6 w-16" />
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <Skeleton className="h-6 w-16" />
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <Skeleton className="h-6 w-20" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </td>
                </tr>
              ))
            : activeLoans.map((loan) => (
                <motion.tr
                  key={loan.sl_no}
                  className="border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3 hidden md:table-cell">0{loan.sl_no}.</td>
                  <td className="p-3">{formatCurrency(loan.loan_money)}</td>
                  <td className="p-3">{formatCurrency(loan.left_to_repay)}</td>
                  <td className="p-3 hidden md:table-cell">{loan.duration}</td>
                  <td className="p-3 hidden md:table-cell">
                    {loan.interest_rate}
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    {formatCurrency(loan.installment)} /month
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRepay(loan.sl_no)}
                      className="px-5 py-2 rounded-3xl border-2 border-[#1814F3] text-[#1814F3]"
                    >
                      Repay
                    </button>
                  </td>
                </motion.tr>
              ))}
        </tbody>
      </table>
    </section>
  );
}
