"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { motion } from "framer-motion"; // Import Framer Motion

import { Settings, BellDotIcon } from "lucide-react";

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

  const { toggleSidebar } = useSidebar();

  return (
    <motion.div
      className="w-full flex flex-col gap-4 px-4 py-5 lg:px-8"
      initial={{ opacity: 0, y: -20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation timing
    >
      <motion.header
        className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 w-full mb-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="w-full flex items-center justify-between">
          <button
            className="flex flex-col justify-between items-center w-9 h-9 p-2 lg:hidden"
            onClick={toggleSidebar}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-400`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-400`}
            ></span>
          </button>
          <motion.h1
            className="font-bold text-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {title}
          </motion.h1>
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
        <motion.div
          className="lg:flex lg:gap-4 lg:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
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
          <div className="min-w-12 min-h-12 bg-[#F5F7FA] rounded-full hidden lg:flex lg:items-center lg:justify-center hover:opacity-80 cursor-pointer">
            <Settings className="text-[#718EBF]" />
          </div>
          <div className="min-w-12 min-h-12 bg-[#F5F7FA] rounded-full hidden lg:flex lg:items-center lg:justify-center hover:opacity-80 cursor-pointer">
            <BellDotIcon className="text-[#FE5C73]" />
          </div>
          <div className="min-w-12 min-h-12 rounded-full overflow-hidden lg:block hidden">
            <Image
              src={"/images/profile-pic.svg"}
              width={50}
              height={50}
              alt="profile-pic"
            />
          </div>
        </motion.div>
      </motion.header>
    </motion.div>
  );
}
