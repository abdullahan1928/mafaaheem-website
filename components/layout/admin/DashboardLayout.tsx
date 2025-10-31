"use client";

import { SidebarProvider } from "@/components/ui/sidebar";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Area */}
      <main className="flex-1 flex flex-col w-full">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
