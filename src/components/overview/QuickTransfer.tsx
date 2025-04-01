"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, SendIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickTransfer() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const transfer_recipients = [
    { icon: faUserCircle, name: "Livia Bator", position: "CEO" },
    { icon: faUserCircle, name: "Randy Press", position: "Director" },
    { icon: faUserCircle, name: "Workman", position: "Designer" },
    { icon: faUserCircle, name: "Alice Doe", position: "Manager" },
    { icon: faUserCircle, name: "John Smith", position: "Engineer" },
    { icon: faUserCircle, name: "Jane Roe", position: "Analyst" },
  ];

  const handleSend = () => {
    if (!isNaN(Number(amount)) && amount.trim() !== "") {
      setMessage(`Transfer of $${amount} initiated!`);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setMessage("Please enter a valid numeric amount.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg text-[#DDDDDD]">Quick Transfer</h2>
      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : (
        <Carousel className="w-full max-w-[340px] lg:max-w-full md:max-w-full carousel">
          <CarouselContent>
            {transfer_recipients.map((recipient, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col gap-2 text-center items-center"
              >
                <FontAwesomeIcon
                  icon={recipient.icon}
                  className="text-4xl text-gray-500"
                />
                <p className="flex flex-col">
                  <span className="text-base">{recipient.name}</span>
                  <span className="text-[#718EBF]">{recipient.position}</span>
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <div className="flex items-center w-full gap-5">
        <span className="text-base text-[#718EBF] text-nowrap">
          Write Amount
        </span>
        <div className="bg-[#EDF1F7] flex items-center pl-3 rounded-3xl font-medium justify-between">
          <input
            type="text"
            placeholder="525.50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none px-2 max-w-[100px]"
          />
          <button
            onClick={handleSend}
            className="bg-[#1814F3] flex items-center w-full py-3 px-6 rounded-3xl text-white hover:bg-[#0f0dcf]"
          >
            <span>Send</span>
            <SendIcon />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {message && (
          <motion.p
            className="text-sm text-[#718EBF] mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
