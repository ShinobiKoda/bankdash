"use client";

import { AppSidebar } from "@/components/overview/Sidebar";
import Header from "@/components/overview/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen lg:ml-[16rem]">
        <Header />
        <div className="px-4 lg:px-8">{children}</div>
      </div>
    </SidebarProvider>
  );
}
