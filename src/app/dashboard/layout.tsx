"use client"

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen bg-white">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}
