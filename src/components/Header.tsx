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
    "/dashboard/Privileges": "My Privileges",
    "/dashboard/Investments": "Investments",
  };

  const title = pageTitles[pathname] || "Dashboard";

  const [isOpen, setIsOpen] = useState(false);

  const { toggleSidebar } = useSidebar();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full flex flex-col gap-4 px-4 py-5"
    >
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full mb-4">
        <div className="w-full flex items-center justify-between">
          <button
            className="flex flex-col justify-center items-center w-10 h-10 p-2 lg:hidden"
            onClick={toggleSidebar}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-400 ${
                isOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "my-1"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-400 ${
                isOpen ? "-rotate-45 -translate-y-0.5" : ""
              }`}
            ></span>
          </button>
          <h1 className="font-bold text-2xl">{title}</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={"/images/profile-pic.svg"}
              width={100}
              height={100}
              alt="profile-pic"
              className="lg:hidden"
            />
          </div>
        </div>
        <div className="lg:flex lg:gap-4 lg:items-center">
          <div className="flex items-center gap-2 py-3 px-4 bg-[#F5F7FA] rounded-3xl w-full lg:min-w-[255px]">
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
          <div className="min-w-12 min-h-12 bg-[#F5F7FA] rounded-full lg:block hidden">

          </div>
          <div className="min-w-12 min-h-12 bg-[#F5F7FA] rounded-full hidden lg:block">

          </div>
          <div className="min-w-12 min-h-12 rounded-full overflow-hidden lg:block hidden">
            <Image
              src={"/images/profile-pic.svg"}
              width={50}
              height={50}
              alt="profile-pic"
            />
          </div>
        </div>
      </header>
    </motion.div>
  );
}
