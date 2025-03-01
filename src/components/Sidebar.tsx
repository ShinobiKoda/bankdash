"use client"

import { usePathname } from "next/navigation";
import Image from "next/image";


import { Home, Settings, DollarSignIcon, User, PiggyBank, WalletCards, SpadeIcon, Lightbulb } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard/Overview",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/dashboard/Transactions",
    icon: DollarSignIcon,
  },
  {
    title: "Accounts",
    url: "/dashboard/Accounts",
    icon: User,
  },
  {
    title: "Investments",
    url: "/dashboard/Investments",
    icon: PiggyBank,
  },
  {
    title: "Credit Cards",
    url: "/dashboard/Credit-cards",
    icon: WalletCards,
  },
  {
    title: "Loans",
    url: "/dashboard/Loans",
    icon: DollarSignIcon,
  },
  {
    title: "Services",
    url: "/dashboard/Services",
    icon: SpadeIcon,
  },
  {
    title: "My Privileges",
    url: "/dashboard/Overview",
    icon: Lightbulb,
  },
  {
    title: "Setting",
    url: "/dashboard/Settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <Image width={20} height={20} alt="Logo" src="/images/icon-bankdash.svg"/>
        <span className="font-extrabold text-3xl text-[#343C6A]">BankDash</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="text-xl">
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 ${
                        pathname === item.url ? "text-[#AC39D4]" : "text-[#B1B1B1]"
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
