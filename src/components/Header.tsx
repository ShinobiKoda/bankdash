"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({isOpen, setIsOpen}: HeaderProps) {

  return (
    <div className="w-full flex flex-col gap-4 px-4 py-5">
      <header className="w-full flex items-center justify-between">
        <div className="hamburger w-[28px] h-[20px] flex flex-col justify-between *:rounded-sm cursor-pointer hover:opacity-90 z-20" onClick={()=>setIsOpen(!isOpen)}>
          <div className="h-[2px] bg-black w-full"></div>
          <div className="h-[2px] bg-black w-full"></div>
          <div className="h-[2px] bg-black w-full"></div>
        </div>
        <h1 className="font-bold text-2xl">Overview</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={"/images/profile-pic.svg"}
            width={100}
            height={100}
            alt="profile-pic"
          />
        </div>
      </header>
      <div className="w-full rounded-md">
        <div className="flex items-center gap-2 p-3 bg-[#F5F7FA]">
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
