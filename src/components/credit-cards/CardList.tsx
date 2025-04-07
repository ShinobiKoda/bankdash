"use client";

import React, { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FaCreditCard } from "react-icons/fa";

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
      <div className="flex flex-col gap-4 h-full">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="shadow-lg rounded-xl p-4">
                <Skeleton className="w-full h-6 mb-2" />
                <Skeleton className="w-3/4 h-4 mb-2" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))
          : cards.map((card, index) => (
              <div
                className="shadow-lg rounded-xl p-4 flex flex-col gap-2"
                key={index}
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
                    style={{ width: "12ch" }} // Reserve space for card number
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
              </div>
            ))}
      </div>
    </section>
  );
}
