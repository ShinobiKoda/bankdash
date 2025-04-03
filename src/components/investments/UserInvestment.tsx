"use client";

import React from "react";

import { fetchUserData } from "@/lib/api";
import type { UserInvestment } from "@/types/types";
import { useState, useEffect } from "react";
import { FaAppStoreIos, FaGoogle, FaCar } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

export default function UserInvestment() {
  const [userInvestment, setUserInvestment] = useState<UserInvestment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserInvestment = async () => {
    try {
      const user = await fetchUserData();
      setUserInvestment(user.user_investments);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInvestment();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const styles = [
    {
      bgcolor: "#FFE0EB",
      icon: <FaAppStoreIos className="text-[#FF82AC] text-2xl" />,
    },
    {
      bgcolor: "#E7EDFF",
      icon: <FaGoogle className="text-[#4471FF]" />,
    },
    {
      bgcolor: "#FFF5D9",
      icon: <FaCar className="text-[#FFBB38]" />,
    },
  ];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-semibold text-xl text-[#333B69]">My Investment</h2>
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-md" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-32 h-4 rounded" />
                  <Skeleton className="w-32 h-3 rounded" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="w-16 h-4 rounded" />
                <Skeleton className="w-20 h-3 rounded hidden lg:block" />
              </div>
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="w-16 h-4 rounded" />
                <Skeleton className="w-20 h-3 rounded hidden lg:block" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {userInvestment.map((investment, index) => {
            const sign =
              investment.type_of_percentage === "positive" ? "+" : "-";
            const color =
              investment.type_of_percentage === "positive"
                ? "#16DBAA"
                : "#FE5C73";

            return (
              <div key={index} className="flex items-center justify-between shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center"
                    style={{
                      backgroundColor: styles[index % styles.length].bgcolor,
                    }}
                  >
                    {styles[index % styles.length].icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="w-32 truncate font-medium">{investment.name}</span>
                    <span className="text-[#718EBF] w-32 truncate">
                      {investment.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-16 text-center font-medium">
                    {formatCurrency(investment.value)}
                  </span>
                  <span className="text-[#718EBF] w-20 text-center hidden lg:block text-nowrap">
                    Return value
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <p style={{ color: color }} className="w-16 text-center">
                    {sign}
                    {investment.percentage}%
                  </p>
                  <p className="text-[#718EBF] w-20 text-center hidden lg:block text-nowrap">
                    Return value
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
