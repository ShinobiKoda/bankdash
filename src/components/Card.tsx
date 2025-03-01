"use client";

import React from "react";
import { fetchUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import type { CreditCard } from "@/types/types";

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
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex gap-[0.5rem]">
          {cards.length > 0 ? (
            cards.map(({ name, number, valid_thru, balance, bank }, index) => (
              <CarouselItem key={index} className="border rounded-lg shadow md:basis-[80%] sm:basis-[80%] basis-[90%]">
                <h2 className="text-lg font-semibold">{bank}</h2>
                <p>Cardholder: {name}</p>
                <p>Number: **** **** **** {number.slice(-4)}</p>
                <p>Valid Thru: {valid_thru}</p>
                <p>Balance: ${balance.toLocaleString()}</p>
              </CarouselItem>
            ))
          ) : (
            <p>Loading cards...</p>
          )}
        </CarouselContent>
      </Carousel>
  );
}

