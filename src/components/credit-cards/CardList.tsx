"use client";

import React, { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CardList() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null
  );

  const getUserCards = async () => {
    try {
      const user = await fetchUserData();
      setCards(user.credit_cards);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCards();
  }, []);

  const iconStyle = [
    {
      bgColor: "#E7EDFF",
      iconColor: "#396AFF",
    },
    {
      bgColor: "#FFE0EB",
      iconColor: "#FF82AC",
    },
    {
      bgColor: "#FFF5D9",
      iconColor: "#FFBB38",
    },
  ];

  const formatCardNumber = (number: string, showFull: boolean) => {
    const formattedNumber = number.replace(/(\d{4})(?=\d)/g, "$1 ");
    return showFull
      ? formattedNumber
      : formattedNumber.replace(/\d/g, (digit, index) =>
          index < formattedNumber.length - 5 ? "*" : digit
        );
  };

  return (
    <section className="w-full h-full">
      <h2 className="font-semibold text-xl text-[#343C6A]">Cards List</h2>
      <div className="flex flex-col gap-8 h-full">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="shadow-lg rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <div
                  className="hidden lg:flex flex-col gap-1"
                  style={{ width: "12ch" }}
                >
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
                <Skeleton className="w-20 h-6" />
              </div>
            ))
          : cards.map((card, index) => (
              <motion.div
                className="shadow-lg rounded-xl p-4 flex flex-col gap-2"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg"
                      style={{
                        backgroundColor:
                          iconStyle[index % iconStyle.length].bgColor,
                      }}
                    >
                      <FaCreditCard
                        className="text-xl"
                        style={{
                          color: iconStyle[index % iconStyle.length].iconColor,
                        }}
                      />
                    </div>
                    <p className="flex flex-col">
                      <span className="font-medium">Card Type</span>
                      <span className="text-[#718EBF]">{card.type}</span>
                    </p>
                  </div>
                  <p className="flex flex-col">
                    <span className="font-medium">Bank</span>
                    <span className="text-[#718EBF]">{card.bank}</span>
                  </p>
                  <p
                    className="hidden lg:flex flex-col"
                    style={{ width: "12ch" }}
                  >
                    <span className="font-medium">Card Number</span>
                    <span className="text-[#718EBF] whitespace-nowrap">
                      {formatCardNumber(
                        card.number,
                        expandedCardIndex === index
                      )}
                    </span>
                  </p>
                  <button
                    className="font-medium text-[#1814F3] hover:opacity-85 cursor-pointer"
                    onClick={() =>
                      setExpandedCardIndex(
                        expandedCardIndex === index ? null : index
                      )
                    }
                  >
                    {expandedCardIndex === index
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
}
