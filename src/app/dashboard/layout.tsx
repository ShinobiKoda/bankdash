"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/overview/Sidebar";
import Header from "@/components/overview/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen bg-white lg:ml-[16rem]">
        <Header />
        <div className="px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
