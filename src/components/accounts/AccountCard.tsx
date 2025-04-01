"use client";

import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";
import { Skeleton } from "../ui/skeleton"; // Import Skeleton component
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Import carousel components
import { motion } from "framer-motion"; // Import Framer Motion

export default function AccountCard() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [currentCard, setCurrentCard] = useState<CreditCard>({} as CreditCard);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false); // State to toggle all cards view

  const getUserCard = async (): Promise<void> => {
    try {
      const user = await fetchUserData();
      setCards(user.credit_cards);
      setCurrentCard(user.credit_cards[0]); // Set the first card as the current card
    } catch (error) {
      console.log("Failed to load user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCard();
  }, []);

  const formatCardNumber = (number: string): string => {
    if (!number || number.length < 8) return number; // Handle invalid numbers

    const firstFour = number.slice(0, 4);
    const masked = "**** **** ****"; // Adjust based on total length

    return `${firstFour} ${masked}`;
  };

  const formatBalance = (balance: number | undefined): string => {
    if (typeof balance !== "number" || isNaN(balance)) {
      return "0"; // Default to "0" if balance is invalid
    }
    return balance.toLocaleString(); // Format balance with commas
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <header className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-xl text-[#343C6A]">My cards</h3>
        <button
          className="hover:opacity-90 cursor-pointer text-[#343C6A]"
          onClick={() => setShowAll(!showAll)} // Toggle showAll state
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </header>
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shadow-lg flex flex-col gap-6 overflow-hidden p-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ) : showAll ? (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="w-full max-w-[340px] lg:max-w-full md:max-w-full carousel">
            <CarouselContent>
              {cards.map((card, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[95%] lg:basis-[80%]"
                >
                  <motion.div
                    className="bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] text-white rounded-xl shadow-lg flex flex-col gap-6 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-3 w-full flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <p className="flex flex-col gap-1">
                          <span>Balance</span>
                          <span className="font-semibold text-2xl">
                            ${formatBalance(card.balance)}
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
                          <span className="text-lg">{card.valid_thru}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gradient-to-r from-white/10 to-white/10 p-3 w-full">
                      <p className="text-xl ">
                        {formatCardNumber(card.number)}
                      </p>
                      <Image
                        src="/images/card-logo.svg"
                        alt="card-logo"
                        height={35}
                        width={35}
                      />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      ) : (
        <motion.div
          className="bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] text-white rounded-xl shadow-lg flex flex-col gap-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-3 w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="flex flex-col gap-1">
                <span>Balance</span>
                <span className="font-semibold text-2xl">
                  ${formatBalance(currentCard.balance)}
                </span>
              </p>
              <Image
                src="/images/Chip-Card.svg"
                height={35}
                width={35}
                alt="Chip-card"
              />
            </div>

            <div className="flex items-center gap-12">
              <p className="flex flex-col">
                <span className="opacity-70">CARD HOLDER</span>
                <span className="text-lg">{currentCard.name}</span>
              </p>
              <p className="flex flex-col">
                <span className="opacity-70">VALID THRU</span>
                <span className="text-lg">{currentCard.valid_thru}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gradient-to-r from-white/10 to-white/10 p-3 w-full">
            <p className="text-xl ">{formatCardNumber(currentCard.number)}</p>
            <Image
              src="/images/card-logo.svg"
              alt="card-logo"
              height={35}
              width={35}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
