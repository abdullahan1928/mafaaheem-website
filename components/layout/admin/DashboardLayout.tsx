"use client";

import { SidebarProvider } from "@/components/ui/sidebar";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Area */}
      <main className="flex-1 flex flex-col w-full">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <div className="flex-1 px-10 py-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
