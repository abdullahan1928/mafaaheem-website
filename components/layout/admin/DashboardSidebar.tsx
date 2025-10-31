import Image from 'next/image';

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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from '@/routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, BookOpen, CalendarDays, Home } from "lucide-react";

const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", href: ROUTES.DASHBOARD.INDEX, icon: Home },
    { title: "Blogs", href: ROUTES.DASHBOARD.BLOGS.LIST, icon: BookOpen },
    { title: "Events", href: ROUTES.DASHBOARD.EVENTS.LIST, icon: CalendarDays },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center gap-2 px-4 py-2 w-full justify-center">
        <Image
          src="/images/logo/mafaaheem.png"
          alt="Mafaaheem Logo"
          width={1000}
          height={1000}
          className="w-1/2 h-auto"
        />
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
  )
}

export default DashboardSidebar