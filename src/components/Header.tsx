"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSidebar } from "./ui/sidebar";


export default function Header() {
  const pathname = usePathname();

  const pageTitles: { [key: string]: string } = {
    "/dashboard/Overview": "Overview",
    "/dashboard/Transactions": "Transactions",
    "/dashboard/Settings": "Settings",
    "/dashboard/Services": "Services",
    "/dashboard/Loans": "Loans",
    "/dashboard/Accounts": "Accounts",
    "/dashboard/Credit-cards": "Credit Cards",
    "/dashboard/Investments": "Investments",
  };

  const title = pageTitles[pathname] || "Dashboard";

  const [isOpen, setIsOpen] = useState(false);

  const {toggleSidebar} = useSidebar();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-4 px-4 py-5"
    >
      <header className="w-full flex items-center justify-between max-w-[1024px] mx-auto">
        <button
      className="flex flex-col justify-center items-center w-10 h-10 p-2 border-2 border-gray-700 rounded-md focus:outline-none"
      onClick={toggleSidebar}
    >
      <span
        className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isOpen ? "opacity-0" : "my-1"}`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
      ></span>
    </button>
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={"/images/profile-pic.svg"}
            width={100}
            height={100}
            alt="profile-pic"
          />
        </div>
      </header>
      <div className="w-full max-w-[1024px] mx-auto">
        <div className="flex items-center gap-2 py-3 px-4 bg-[#F5F7FA] rounded-3xl">
          <Image
            src={"/images/search-icon.svg"}
            height={20}
            width={20}
            alt="Search Icon"
          />
          <input
            type="text"
            placeholder="Search for something"
            className="bg-transparent outline-none border-none w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
