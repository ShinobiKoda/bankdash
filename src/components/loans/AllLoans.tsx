"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { fetchUserData } from "@/lib/api";
import type { Loan } from "@/types/types";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faUser,
  faBusinessTime,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

export default function AllLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserLoans = async () => {
    try {
      const user = await fetchUserData();
      setLoans(user.all_loans);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLoans();
  }, []);

  const loanStyles = [
    {
      iconBgColor: "#E7EDFF",
      icon: faUser,
      iconcolor: "#396AFF",
    },
    {
      iconBgColor: "#FFF5D9",
      icon: faBusinessTime,
      iconcolor: "#FFBB38",
    },
    {
      iconBgColor: "#FFE0EB",
      icon: faArrowTrendUp,
      iconcolor: "#FF82AC",
    },
    {
      iconBgColor: "#DCFAF8",
      icon: faTools,
      iconcolor: "#16DBCC",
    },
  ];

  const length = loanStyles.length;

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[320px] lg:max-w-full md:max-w-full carousel"
    >
      <CarouselContent>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="flex items-center gap-4 px-5 py-6 rounded-xl shadow-lg">
                  <Skeleton className="w-14 h-14 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </CarouselItem>
            ))
          : loans.map((loan, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <motion.div
                  className="flex items-center gap-4 px-5 py-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: loanStyles[index].iconBgColor }}
                  >
                    <FontAwesomeIcon
                      icon={loanStyles[index].icon}
                      style={{ color: loanStyles[index].iconcolor }}
                      className="text-lg"
                    />
                  </div>
                  <p className="flex flex-col">
                    <span className="text-[#718EBF]">{loan.description}</span>
                    <span className="font-semibold text-xl">
                      {formatAmount(loan.amount)}
                    </span>
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
        {!loading && (
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <motion.div
              className="flex items-center gap-4 px-5 py-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: loans.length * 0.1 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: loanStyles[length - 1].iconBgColor }}
              >
                <FontAwesomeIcon
                  icon={loanStyles[length - 1].icon}
                  style={{ color: loanStyles[length - 1].iconcolor }}
                  className="text-lg"
                />
              </div>
              <p className="flex flex-col">
                <span className="text-[#718EBF]">Custom Loans</span>
                <span className="font-semibold text-xl">Choose Money</span>
              </p>
            </motion.div>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
}
