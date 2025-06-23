import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  AppWindow,
  Bell,
  Briefcase,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {
  const { state } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "w-full justify-start px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-blue-50 hover:text-blue-600",
          isActive && "bg-blue-100 text-blue-600 font-semibold"
        )}
      >
        <Link to={href} className="flex items-center gap-3">
          <Icon className="h-5 w-5 flex-shrink-0" />
          {state !== "collapsed" && <span>{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = useLocation().pathname;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-6 px-4 flex items-center justify-center border-b">
        {state === "collapsed" ? (
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
            <AppWindow className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
              <AppWindow className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-blue-600">MicroTech IMS</h1>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu>
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/"
            isActive={pathname === "/"}
          />
          <SidebarItem
            icon={ShoppingCart}
            label="Purchase"
            href="/purchase"
            isActive={pathname.startsWith("/purchase")}
          />
          <SidebarItem
            icon={Warehouse}
            label="Inventory"
            href="/inventory"
            isActive={pathname.startsWith("/inventory")}
          />
          <SidebarItem
            icon={Users}
            label="Suppliers"
            href="/suppliers"
            isActive={pathname.startsWith("/suppliers")}
          />
          <SidebarItem
            icon={Briefcase}
            label="Projects"
            href="/projects"
            isActive={pathname.startsWith("/projects")}
          />

          {/* Divider */}
          {state !== "collapsed" && (
            <div className="px-3 py-2">
              <hr className="border-gray-200" />
              <p className="text-xs font-medium text-gray-500 mt-2 mb-1">
                Management
              </p>
            </div>
          )}

          <SidebarItem
            icon={Bell}
            label="Notifications"
            href="/management/notifications"
            isActive={pathname.startsWith("/management/notifications")}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/management/settings"
            isActive={pathname.startsWith("/management/settings")}
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          {state !== "collapsed" ? "v1.0.0" : "v1"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
