import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  AlertTriangle,
  Bell,
  Building,
  Calendar,
  CheckCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface NotificationItem {
  id: string;
  type: "success" | "warning" | "info" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: string;
}

export function Navbar() {
  const [notifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "success",
      title: "Order PO-2023-089 approved",
      message: "Your purchase order was approved by finance.",
      time: "10 minutes ago",
      read: false,
      category: "purchase",
    },
    {
      id: "2",
      type: "warning",
      title: "Low stock: Office Supplies",
      message: "Inventory below threshold in Main Store.",
      time: "1 hour ago",
      read: false,
      category: "inventory",
    },
    {
      id: "3",
      type: "info",
      title: "New supplier added",
      message: "Tech Solutions Inc. is now available.",
      time: "3 hours ago",
      read: false,
      category: "supplier",
    },
    {
      id: "4",
      type: "system",
      title: "System maintenance scheduled",
      message: "Maintenance on June 25, 3:06 AM.",
      time: "Yesterday",
      read: true,
      category: "system",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recentNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Building className="h-4 w-4 text-blue-500" />;
      case "system":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="border-b bg-background z-20 relative shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="flex items-center justify-center rounded-md border h-8 w-8 hover:bg-gray-100" />

        <div className="ml-4 text-lg font-semibold text-blue-600">
          MicroTech IMS
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-blue-50 hover:text-blue-600 relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium min-w-[20px] rounded-full"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {recentNotifications.length > 0 ? (
                <>
                  {recentNotifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="p-3 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium text-gray-900 line-clamp-1 ${
                              !notification.read ? "font-semibold" : ""
                            }`}
                          >
                            {notification.title}
                          </p>
                          {notification.message && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/management/notifications"
                      className="w-full cursor-pointer flex items-center justify-center py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No notifications</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:bg-blue-50"
              >
                <Avatar className="h-9 w-9 border-2 border-blue-100">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-blue-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/management/users/profile"
                  className="cursor-pointer flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
