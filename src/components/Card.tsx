"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import type { Card } from "@/types/types";


export default function Card() {
  const [cards, setCards] = useState<Card[]>([]);
  
  const getUserCard = async() => {
    try{
      const user = await fetchUserData();
      setCards(user.cards);
    }catch(error){
      console.log("Failed to load user data");
      return [];
    }
  }


  return (
    <div className="md:grid md:grid-cols-2 md:space-x-4 flex flex-col space-y-4">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 bg-gradient-to-br from-[#0A06F4] via-blue-800 to-blue-500 rounded-xl shadow-lg text-white"
      >
        <div className="w-full flex items-center justify-between p-3">
          <p className="flex flex-col gap-[0.2rem]">
            <span className="text-[16px]">Balance</span>
            <span className="font-semibold text-2xl">$5,756</span>
          </p>
          <Image
            src={"/images/Chip-Card.svg"}
            alt="chip card"
            height={40}
            width={40}
          />
        </div>
        <div className="flex items-center space-x-9 p-3">
          <p className="flex flex-col">
            <span className="font-normal text-[#FFFFFFB3]">CARD HOLDER</span>
            <span className="font-semibold text-[1.4rem]">Eddy Cusuma</span>
          </p>
          <p className="flex flex-col">
            <span className="font-normal text-[#FFFFFFB3]">VALID THRU</span>
            <span className="font-semibold text-[1.4rem]">12/22</span>
          </p>
        </div>
        <p className="flex items-center justify-between from-2% to-90% to-opacity-15 w-full p-4 rounded-b-xl">
          <span className="font-semibold text-lg">3784 **** **** 1234</span>
          <Image
            src={"/images/card-logo.svg"}
            height={40}
            width={40}
            alt="Card Logo"
          />
        </p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 bg-white rounded-xl shadow-lg text-black"
      >
        <div className="w-full flex items-center justify-between p-3">
          <p className="flex flex-col gap-[0.2rem]">
            <span className="text-[16px]">Balance</span>
            <span className="font-semibold text-2xl">$5,756</span>
          </p>
          <Image
            src={"/images/Chip-Card-black.svg"}
            alt="chip card"
            height={40}
            width={40}
          />
        </div>
        <div className="flex items-center space-x-9 p-3">
          <p className="flex flex-col">
            <span className="font-normal text-[#718EBF]">CARD HOLDER</span>
            <span className="font-semibold text-[1.4rem]">Eddy Cusuma</span>
          </p>
          <p className="flex flex-col">
            <span className="font-normal text-[#718EBF]">VALID THRU</span>
            <span className="font-semibold text-[1.4rem]">12/22</span>
          </p>
        </div>
        <hr />
        <p className="flex items-center justify-between  w-full p-4 rounded-b-xl">
          <span className="font-semibold text-lg">3784 **** **** 1234</span>
          <Image
            src={"/images/card-logo-black.svg"}
            height={40}
            width={40}
            alt="Card Logo"
          />
        </p>
      </motion.section>
    </div>
  );
}
