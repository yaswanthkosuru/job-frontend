"use client"

import React from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { 
  BarChart3, 
  BriefcaseIcon, 
  Building2, 
  Home, 
  LogOut, 
  Settings, 
  Users 
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center px-4">
            <div className="flex items-center gap-2 font-semibold">
              <Building2 className="h-6 w-6" />
              <span>LearnFluid</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex flex-col gap-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/dashboard"} 
                  onClick={() => router.push("/dashboard")}
                >
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/dashboard/jobs"} 
                  onClick={() => router.push("/dashboard/jobs")}
                >
                  <BriefcaseIcon />
                  <span>Job Postings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/dashboard/candidates"} 
                  onClick={() => router.push("/dashboard/candidates")}
                >
                  <Users />
                  <span>Candidates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/dashboard/analytics"} 
                  onClick={() => router.push("/dashboard/analytics")}
                >
                  <BarChart3 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={pathname === "/dashboard/settings"} 
                  onClick={() => router.push("/dashboard/settings")}
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">User Name</span>
                  <span className="text-xs text-muted-foreground">user@example.com</span>
                </div>
              </div>
              <Separator />
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  // Handle logout
                  localStorage.removeItem("token")
                  router.push("/login")
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
