"use client";

import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Credit_Card() {
  const [cards, setCards] = useState<CreditCard[]>([]);

  const getUserCard = async () => {
    try {
      const user = await fetchUserData();
      setCards(user.credit_cards);
    } catch (error) {
      console.log("Failed to load user data");
      return [];
    }
  };

  useEffect(() => {
    getUserCard();
  }, []);

  const formatCardNumber = (number: string) => {
    if (!number || number.length < 8) return number; // Handle invalid numbers

    const firstFour = number.slice(0, 4);
    const lastFour = number.slice(-4);
    const masked = "**** **** ****"; // Adjust based on total length

    return `${firstFour} ${masked} ${lastFour}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.number}
          className="bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] text-white rounded-xl shadow-lg flex flex-col gap-4 overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={index} // Pass index for staggered delay
        >
          <div className="p-3 w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="flex flex-col gap-1">
                <span>Balance</span>
                <span className="font-semibold text-2xl">
                  ${card.balance.toLocaleString("en")}
                </span>
              </p>
              <Image
                src="/images/Chip-Card.svg"
                height={35}
                width={35}
                alt="Chip-card"
              />
            </div>

            <div className="flex items-center gap-8">
              <p className="flex flex-col">
                <span className="opacity-70">CARD HOLDER</span>
                <span className="text-lg">{card.name}</span>
              </p>
              <p className="flex flex-col">
                <span className="opacity-70">VALID THRU</span>
                <span className="text-lg">12/22</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gradient-to-r from-white/10 to-white/10 backdrop-blur-lg p-3 w-full">
            <p className="text-xl ">{formatCardNumber(card.number)}</p>
            <Image
              src="/images/card-logo.svg"
              alt="card-logo"
              height={35}
              width={35}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
