"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Settings, LogOut, BookOpen, CalendarDays, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/routes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [pageTitle, setPageTitle] = useState<string>("");

  // Page title listener for dynamic breadcrumb labels
  useEffect(() => {
    const updatePageTitle = () => {
      const title = document.body.getAttribute("data-page-title");
      setPageTitle(title || "");
    };
    updatePageTitle();
    const observer = new MutationObserver(updatePageTitle);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-page-title"] });
    return () => observer.disconnect();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    router.push(ROUTES.AUTH.LOGIN);
  };

  // Sidebar routes for Admin Panel
  const menuItems = [
    { title: "Dashboard", href: ROUTES.DASHBOARD.INDEX, icon: Home },
    { title: "Blogs", href: ROUTES.DASHBOARD.BLOGS.LIST, icon: BookOpen },
    { title: "Events", href: ROUTES.DASHBOARD.EVENTS.LIST, icon: CalendarDays },
  ];

  // Breadcrumb generator
  const generateBreadcrumbs = () => {
    if (!pathname) return [];

    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === "admin") label = "Dashboard";
      if (segment === "blogs") label = "Blogs";
      if (segment === "events") label = "Events";
      if (segment === "settings") label = "Settings";
      if (segment === "new") label = "New";
      if (isLast && pageTitle) label = pageTitle;

      crumbs.push({ label, href: currentPath });
    });

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-2 w-full justify-center">
            <Image
              src="/images/logo/mafaaheem.png"
              alt="Mafaaheem Logo"
              width={1000}
              height={1000}
              className="w-1/2 h-auto"
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  const currentPath = pathname.replace(/\/$/, "");
                  const itemPath = item.href.replace(/\/$/, "");

                  const active =
                    currentPath === itemPath ||
                    (currentPath.startsWith(itemPath + "/") && itemPath !== ROUTES.DASHBOARD.INDEX);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-mafaaheem-gold text-mafaaheem-brown text-xs">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start flex-1 overflow-hidden">
                      <span className="text-sm font-medium truncate w-full">
                        Admin
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Area */}
      <main className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
          <SidebarTrigger />

          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex-1" />
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
