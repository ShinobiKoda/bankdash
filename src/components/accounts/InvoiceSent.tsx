"use client";

import React from "react";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { Invoice } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGamepad, faStore } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"; // Import Framer Motion

export default function InvoiceSent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserInvoices = async () => {
    try {
      const user = await fetchUserData();
      setInvoices(user.invoices_sent);
    } catch (error) {
      console.log("Error: ", error);
      throw Error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInvoices();
  }, []);

  const getIconAndBgColor = (description: string) => {
    if (description.toLowerCase().includes("app store")) {
      return {
        icon: (
          <FontAwesomeIcon icon={faStore} className="text-[#16DBCC] text-2xl" />
        ),
        bgcolor: "#DCFAF8",
      };
    } else if (description.toLowerCase().includes("user")) {
      return {
        icon: (
          <FontAwesomeIcon icon={faUser} className="text-[#FFBB38] text-2xl" />
        ),
        bgcolor: "#FFF5D9",
      };
    } else if (description.toLowerCase().includes("playstation")) {
      return {
        icon: (
          <FontAwesomeIcon
            icon={faGamepad}
            className="text-[#396AFF] text-2xl"
          />
        ),
        bgcolor: "#E7EDFF",
      };
    } else {
      return {
        icon: (
          <FontAwesomeIcon icon={faUser} className="text-[#FF82AC] text-2xl" />
        ),
        bgcolor: "#FFE0EB",
      };
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#343C6A]">Inovices Sent</h2>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="flex items-center justify-between w-full"
              key={index}
            >
              <div className="flex items-center gap-4">
                <Skeleton className="w-[45px] h-[45px] rounded-[12px]" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex flex-col gap-4 h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {invoices.map((invoice, index) => {
            const { icon, bgcolor } = getIconAndBgColor(invoice.description);
            return (
              <motion.div
                className="flex items-center justify-between w-full"
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-[45px] h-[45px] rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: bgcolor }}
                  >
                    {icon}
                  </div>
                  <p className="flex flex-col">
                    <span className="font-medium text-[#333B69]">
                      {invoice.description}
                    </span>
                    <span className="text-[#718EBF]">{invoice.time}</span>
                  </p>
                </div>
                <p className="text-[#718EBF]">${invoice.amount}</p>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
