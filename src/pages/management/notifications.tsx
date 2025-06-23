import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Bell,
  Building,
  Calendar,
  CheckCircle,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const notificationFilterSchema = z.object({
  search: z.string().optional(),
});

type NotificationFilterValues = z.infer<typeof notificationFilterSchema>;

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: "purchase" | "inventory" | "supplier" | "system" | "project";
  icon: React.ElementType;
}

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const { control, watch } = useForm<NotificationFilterValues>({
    resolver: zodResolver(notificationFilterSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Purchase order #PO-2023-089 approved",
      message: "Your purchase order was approved by finance.",
      time: "10 minutes ago",
      read: false,
      category: "purchase",
      icon: CheckCircle,
    },
    {
      id: "2",
      type: "warning",
      title: "Low inventory alert: Office Supplies",
      message: "Inventory below threshold in Main Store.",
      time: "1 hour ago",
      read: false,
      category: "inventory",
      icon: AlertTriangle,
    },
    {
      id: "3",
      type: "info",
      title: "New supplier request from Tech Solutions Inc.",
      message: "New suppliers is now available.",
      time: "3 hours ago",
      read: false,
      category: "supplier",
      icon: Building,
    },
    {
      id: "4",
      type: "success",
      title: "Project 'Office Renovation' deadline updated",
      message: "Delivery confirmed for Hyatt Regency.",
      time: "Yesterday at 4:30 PM",
      read: true,
      category: "project",
      icon: Calendar,
    },
    {
      id: "5",
      type: "system",
      title: "System maintenance scheduled",
      message: "Maintenance on June 25, 3:06 AM.",
      time: "Yesterday at 2:15 PM",
      read: true,
      category: "system",
      icon: Settings,
    },
    {
      id: "6",
      type: "info",
      title: "Quarterly inventory report available",
      message: "",
      time: "Monday at 9:00 AM",
      read: true,
      category: "inventory",
      icon: FileText,
    },
    {
      id: "7",
      type: "info",
      title: "New user Alex Johnson added to your team",
      message: "",
      time: "Monday at 8:45 AM",
      read: true,
      category: "system",
      icon: Users,
    },
    {
      id: "8",
      type: "warning",
      title: "Purchase order #PO-2023-087 rejected",
      message: "",
      time: "Sunday at 5:20 PM",
      read: true,
      category: "purchase",
      icon: ShoppingCart,
    },
    {
      id: "9",
      type: "info",
      title: "Budget approval required for Project XYZ",
      message: "",
      time: "Friday at 11:30 AM",
      read: true,
      category: "project",
      icon: FileText,
    },
  ];

  // Filter notifications based on tab and search
  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "unread" && !notification.read) ||
      (selectedTab === "system" && notification.category === "system") ||
      (selectedTab === "orders" && notification.category === "purchase") ||
      (selectedTab === "inventory" && notification.category === "inventory") ||
      (selectedTab === "projects" && notification.category === "project");

    const matchesSearch =
      !searchValue ||
      notification.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchValue.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Group notifications by time period
  const groupedNotifications = {
    today: filteredNotifications.filter(
      (n) => n.time.includes("minutes ago") || n.time.includes("hour ago")
    ),
    yesterday: filteredNotifications.filter((n) =>
      n.time.includes("Yesterday")
    ),
    lastWeek: filteredNotifications.filter(
      (n) =>
        n.time.includes("Monday") ||
        n.time.includes("Sunday") ||
        n.time.includes("Friday")
    ),
  };

  const getNotificationIcon = (notification: Notification) => {
    const Icon = notification.icon;
    const iconColors = {
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
      system: "text-purple-600",
    };
    return <Icon className={`h-5 w-5 ${iconColors[notification.type]}`} />;
  };

  const getNotificationBadge = (type: string) => {
    const badgeConfig = {
      success: { variant: "default" as const, color: "bg-green-500" },
      warning: { variant: "destructive" as const, color: "bg-yellow-500" },
      info: { variant: "secondary" as const, color: "bg-blue-500" },
      system: { variant: "outline" as const, color: "bg-purple-500" },
    };
    return badgeConfig[type as keyof typeof badgeConfig] || badgeConfig.info;
  };

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
  };

  const clearAll = () => {
    // Logic to clear all notifications
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <div
      className={`flex items-start gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
        !notification.read ? "bg-blue-50/50" : ""
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        {getNotificationIcon(notification)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p
              className={`text-sm font-medium text-gray-900 ${
                !notification.read ? "font-semibold" : ""
              }`}
            >
              {notification.title}
            </p>
            {notification.message && (
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
          </div>

          <div className="flex items-center gap-2">
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile chevron */}
      <div className="md:hidden">
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const MobileNotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <div
      className={`flex items-center gap-3 p-3 border-b border-gray-100 last:border-0 ${
        !notification.read ? "bg-blue-50/30" : ""
      }`}
    >
      <div className="flex-shrink-0">{getNotificationIcon(notification)}</div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm text-gray-900 truncate ${
            !notification.read ? "font-semibold" : ""
          }`}
        >
          {notification.title}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {notification.message || notification.time}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb - Desktop only */}
      <div className="hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/management">Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Notifications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear all
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Search */}
        <div className="mb-6">
          <FormInput
            name="search"
            label="Search notifications"
            placeholder="Search by keyword or date"
            control={control}
            icon={<Search className="h-5 w-5 text-gray-400" />}
            className="max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            <div className="space-y-6">
              {/* Today */}
              {groupedNotifications.today.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Today</h3>
                  <Card>
                    <CardContent className="p-0">
                      {groupedNotifications.today.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Yesterday */}
              {groupedNotifications.yesterday.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Yesterday</h3>
                  <Card>
                    <CardContent className="p-0">
                      {groupedNotifications.yesterday.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Last 7 Days */}
              {groupedNotifications.lastWeek.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Last 7 Days</h3>
                  <Card>
                    <CardContent className="p-0">
                      {groupedNotifications.lastWeek.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load more button */}
        {filteredNotifications.length > 0 && (
          <div className="text-center pt-6">
            <Button variant="outline">Load more</Button>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-4"
        >
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Unread
            </TabsTrigger>
            <TabsTrigger value="system" className="flex-1">
              System
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            <div className="space-y-1">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <MobileNotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No notifications found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
