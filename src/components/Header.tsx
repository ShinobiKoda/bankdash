"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
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

  return (
    <div className="w-full flex flex-col gap-4 px-4 py-5">
      <header className="w-full flex items-center justify-between max-w-[1024px] mx-auto">
        <div
          className="relative w-[28px] h-[20px] flex flex-col justify-between cursor-pointer z-40"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Top bar */}
          <div
            className={`h-[2px] bg-black w-full rounded-sm transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[9px] bg-white" : ""
            }`}
          ></div>

          {/* Middle bar (disappears when menu is open) */}
          <div
            className={`h-[2px] bg-black w-full rounded-sm transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>

          {/* Bottom bar */}
          <div
            className={`h-[2px] bg-black w-full rounded-sm transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[9px] bg-white" : ""
            }`}
          ></div>
        </div>
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
    </div>
  );
}
