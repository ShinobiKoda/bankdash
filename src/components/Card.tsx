"use client";

import React from "react";
import { fetchUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import type { CreditCard } from "@/types/types";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="flex gap-[0.5rem]">
        {cards.length > 0 ? (
          cards.map(({ name, number, valid_thru, balance, bank }, index) => (
            <CarouselItem
              key={index}
              className="bg-blue-700 rounded-xl p-3 text-white basis-[93%] overflow-hidden flex flex-col gap-5"
            >
              <div className="flex w-full items-center justify-between">
                <p className="flex flex-col gap-1">
                  <span>Balance</span>
                  <span className="font-semibold text-2xl">${balance.toLocaleString('en')}</span>
                </p>
                <Image
                  src="/images/Chip-Card.svg"
                  alt="chip-card-image"
                  height={40}
                  width={40}
                />
              </div>
              <div className="flex gap-[3.5rem]">
                <p className="flex flex-col">
                  <span className="">CARD HOLDER</span>
                  <span>{name}</span>
                </p>
                <p className="flex flex-col">
                  <span>VALID THRU</span>
                  <span>{valid_thru}</span>
                </p>
              </div>
              <p>
                <span>{number}</span>
                <Image
                  src="/images/card-logo.svg"
                  alt="card-logo"
                  height={30}
                  width={30}
                />
              </p>
            </CarouselItem>
          ))
        ) : (
          <p>Loading cards...</p>
        )}
      </CarouselContent>
    </Carousel>
  );
}
