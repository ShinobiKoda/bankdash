"use client";

import React from "react";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/api";
import type { Invoice } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { FaUser, FaPlaystation, FaAppStoreIos } from "react-icons/fa";

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

  const styles = [
    {
      icon: <FaAppStoreIos className="text-[#16DBCC] text-2xl" />,
      bgcolor: "#DCFAF8",
    },
    {
      icon: <FaUser className="text-[#FFBB38] text-2xl" />,
      bgcolor: "#FFF5D9",
    },
    {
      icon: <FaPlaystation className="text-[#396AFF] text-2xl" />,
      bgcolor: "#E7EDFF",
    },
    {
      icon: <FaUser className="text-[#FF82AC] text-2xl" />,
      bgcolor: "#FFE0EB",
    },
  ];

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
        <div className="flex flex-col gap-4">
          {invoices.map((invoice, index) => (
            <div
              className="flex items-center justify-between w-full"
              key={index}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-[45px] h-[45px] rounded-[12px] flex items-center justify-center"
                  style={{
                    backgroundColor: styles[index % styles.length].bgcolor,
                  }}
                >
                  {styles[index % styles.length].icon}
                </div>
                <p className="flex flex-col">
                  <span className="font-medium text-[#333B69]">{invoice.description}</span>
                  <span className="text-[#718EBF]">{invoice.time}</span>
                </p>
              </div>
              <p className="text-[#718EBF]">${invoice.amount}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
