import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard/Overview",
    icon: Home,
  },
  {
    title: "Accounts",
    url: "/dashboard/Accounts",
    icon: Inbox,
  },
  {
    title: "Credit Cards",
    url: "/dashboard/Credit-cards",
    icon: Calendar,
  },
  {
    title: "Investments",
    url: "/dashboard/Investments",
    icon: Search,
  },
  {
    title: "Loans",
    url: "/dashboard/Loans",
    icon: Settings,
  },
  {
    title: "Services",
    url: "/dashboard/Services",
    icon: Settings,
  },
  {
    title: "Transactions",
    url: "/dashboard/Transactions",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "/dashboard/Settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
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
  )
}
