"use client";

import React, { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { UnitTransaction } from "@/types/types";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<UnitTransaction[]>([]);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const transactionsPerPage = 5;

  const getUserTransaction = async () => {
    try {
      setLoading(true);
      const user = await fetchUserData();
      setTransactions(user.all_transactions);
    } catch (error) {
      console.log("Failed to fetch user transaction", error);
    } finally {
      setLoading(false);
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

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  return (
    <section className="flex flex-col gap-7 w-full mb-4">
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
      <div className="flex flex-col gap-5 lg:hidden">
        {loading
          ? Array.from({ length: transactionsPerPage }).map((_, index) => (
              <div
                key={index}
                className="flex gap-3 items-center w-full justify-between"
              >
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          : currentTransactions.map((transaction, index) => {
              let icon;
              const color =
                transaction.type === "debit" ? "#FE5C73" : "#16DBAA";
              const sign = transaction.type === "debit" ? "-" : "+";
              if (transaction.type === "debit") {
                icon = <ArrowUp className="w-[20px] hover:opacity-90" />;
              } else {
                icon = <ArrowDown className="w-[20px] hover:opacity-90" />;
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
                    {sign}${transaction.amount}
                  </p>
                </div>
              );
            })}
      </div>
      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-200">Description</th>
              <th className="p-3 border border-gray-200">Transaction ID</th>
              <th className="p-3 border border-gray-200">Type</th>
              <th className="p-3 border border-gray-200">Card</th>
              <th className="p-3 border border-gray-200">Date</th>
              <th className="p-3 border border-gray-200">Amount</th>
              <th className="p-3 border border-gray-200">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: transactionsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={7} className="p-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  </tr>
                ))
              : currentTransactions.map((transaction, index) => {
                  const color =
                    transaction.type === "debit" ? "#FE5C73" : "#16DBAA";
                  const sign = transaction.type === "debit" ? "-" : "+";

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200 flex items-center gap-2">
                        {transaction.type === "debit" ? (
                          <ArrowUp className="text-[#FE5C73]" />
                        ) : (
                          <ArrowDown className="text-[#16DBAA]" />
                        )}
                        {transaction.description}
                      </td>
                      <td className="p-3 border border-gray-200">#12548796</td>
                      <td className="p-3 border border-gray-200">
                        {transaction.type === "debit" ? "Shopping" : "Transfer"}
                      </td>
                      <td className="p-3 border border-gray-200">1234 ****</td>
                      <td className="p-3 border border-gray-200">
                        {transaction.date}, {transaction.time}
                      </td>
                      <td
                        className="p-3 border border-gray-200"
                        style={{ color }}
                      >
                        {sign}${transaction.amount}
                      </td>
                      <td className="p-3 border border-gray-200">
                        <button className="text-[#1814F3] border border-[#1814F3] px-3 py-1 rounded">
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-[#1814F3] text-white"
                : "bg-none text-black"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
