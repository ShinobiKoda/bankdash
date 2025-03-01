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
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {cards.length > 0 ? (
            cards.map(({ name, number, valid_thru, balance, bank }, index) => (
              <CarouselItem key={index} className="border rounded-lg shadow md:basis-1/2 pl-4">
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

/*

  import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

{cards.length > 0 ? (
          cards.map(({ name, number, valid_thru, balance, bank }, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{bank}</h2>
              <p>Cardholder: {name}</p>
              <p>Number: **** **** **** {number.slice(-4)}</p>
              <p>Valid Thru: {valid_thru}</p>
              <p>Balance: ${balance.toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>Loading cards...</p>
        )}


 */
