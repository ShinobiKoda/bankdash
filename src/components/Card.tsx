"use client";

import React, { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { CreditCard } from "@/types/types";


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

  return (
    <div className="flex items-center overflow-x-scroll">
      {cards.map((card)=>(
        <div key={card.number} className="border">
            <p>{card.name}</p>
            <p>{card.valid_thru}</p>
        </div>
      ))}
    </div>  
    
  );
}
