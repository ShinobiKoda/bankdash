"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Home,
  Settings,
  DollarSignIcon,
  User,
  PiggyBank,
  WalletCards,
  SpadeIcon,
  Lightbulb,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
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
    url: "/dashboard/Privileges",
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

  const { toggleSidebar } = useSidebar();

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint (1024px)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  return isLargeScreen ? (
    <Sidebar collapsible="none" className="shadow-lg">
      <SidebarHeader className="mb-8">
        <Image
          width={40}
          height={40}
          alt="Logo"
          src="/images/icon-bankdash.svg"
        />
        <span className="font-extrabold text-2xl text-[#343C6A]">BankDash</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  key={item.title}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-xl" size="lg">
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 hover:text-[#AC39D4] ${
                          pathname === item.url
                            ? "text-[#AC39D4]"
                            : "text-[#B1B1B1]"
                        }`}
                      >
                        <item.icon width="64" height="64" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ) : (
    <div>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="mb-8">
          <Image
            width={40}
            height={40}
            alt="Logo"
            src="/images/icon-bankdash.svg"
          />
          <span className="font-extrabold text-2xl text-[#343C6A]">
            BankDash
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <motion.div 
                  key={item.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-xl" size="lg">
                        <Link
                          href={item.url}
                          className={`flex items-center gap-2 hover:text-[#AC39D4] ${
                            pathname === item.url
                              ? "text-[#AC39D4]"
                              : "text-[#B1B1B1]"
                          }`}
                          onClick={() => {
                            if (!isLargeScreen) {
                              // Prevent unnecessary toggling if sidebar is already closing due to overlay
                              setTimeout(() => toggleSidebar(), 100);
                            }
                          }}
                        >
                          <item.icon width="64" height="64" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
