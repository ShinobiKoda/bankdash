"use client";

import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Credit_Card({
  newCard,
}: {
  newCard?: CreditCard | null;
}) {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserCard = async (): Promise<void> => {
    try {
      const user = await fetchUserData();
      setCards(user.credit_cards);
    } catch (error) {
      console.log("Failed to load user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCard();
  }, []);

  useEffect(() => {
    if (newCard) {
      setCards((prevCards) => [...prevCards, newCard]);
    }
  }, [newCard]);

  const formatCardNumber = (number: string): string => {
    if (!number || number.length < 8) return number; // Handle invalid numbers

    const firstFour = number.slice(0, 4);
    const masked = "**** **** ****"; // Adjust based on total length

    return `${firstFour} ${masked}`;
  };

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-[340px] lg:max-w-full md:max-w-full carousel cursor-grab hover:cursor-grabbing">
        <CarouselContent className="-ml-4 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  className="pl-4 basis-[85%] md:basis-[40%] lg:basis-1/3"
                  key={index}
                >
                  <div className="bg-gray-100 text-white rounded-xl shadow-lg flex flex-col gap-6 overflow-hidden">
                    <div className="p-3 w-full flex flex-col gap-4">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-8 w-1/2" />
                      <div className="flex items-center gap-8">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                    <div className="p-3 w-full flex items-center justify-between">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-6 w-10" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            : cards.map((card) => (
                <CarouselItem
                  className="pl-4 basis-[85%] md:basis-[40%] sm:basis-[70%] lg:basis-1/3"
                  key={card.number}
                >
                  <div className="bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] text-white rounded-xl shadow-lg flex flex-col gap-6 overflow-hidden">
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
                          <span className="opacity-70 truncate">CARD HOLDER</span>
                          <span className="text-lg truncate">{card.name}</span>
                        </p>
                        <p className="flex flex-col">
                          <span className="opacity-70 truncate">VALID THRU</span>
                          <span className="text-lg">12/22</span>
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
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
