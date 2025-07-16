import { ROUTES } from "@/constants/routes";
import { useDashboardStats } from "@/services/dashboard/useDashboard";
import { AlertTriangle, ClipboardList, Folder, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  iconBgColor?: string;
  iconColor?: string;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  actionLabel,
  actionHref,
  iconBgColor,
  iconColor,
  isLoading,
}: StatCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 flex flex-col h-full relative overflow-hidden">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        {isLoading ? (
          <div className="mt-1 space-y-2">
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold mt-1">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          </>
        )}
      </div>

      <div className="absolute top-6 right-6">
        <div className={`${iconBgColor || "bg-blue-100"} p-3 rounded-lg`}>
          <div className={`${iconColor || "text-blue-600"}`}>{icon}</div>
        </div>
      </div>

      {actionLabel && (
        <Link
          to={actionHref || "#"}
          className="mt-auto w-full py-2 px-4 rounded-md text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export function DashboardOverview() {
  const { data: dashboardStats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Active Projects"
          value={dashboardStats?.activeProjects?.toString() || "0"}
          description={`${
            dashboardStats?.activeProjects || 0
          } projects in progress`}
          icon={<Folder className="h-6 w-6" />}
          actionLabel="View All"
          actionHref={ROUTES.APP.PROJECTS.LIST}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          isLoading={isLoading}
        />

        <StatCard
          title="Pending Orders"
          value={dashboardStats?.pendingPurchaseOrders?.toString() || "0"}
          description={`${
            dashboardStats?.pendingPurchaseOrders || 0
          } orders awaiting approval`}
          icon={<ClipboardList className="h-6 w-6" />}
          actionLabel="Review"
          actionHref={ROUTES.APP.PURCHASE.LIST}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          isLoading={isLoading}
        />

        <StatCard
          title="Low Stock Items"
          value={dashboardStats?.lowStockItems?.toString() || "0"}
          description={`${
            dashboardStats?.lowStockItems || 0
          } items below threshold`}
          icon={<AlertTriangle className="h-6 w-6" />}
          actionLabel="Restock"
          actionHref={ROUTES.APP.INVENTORY.LIST}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          isLoading={isLoading}
        />

        <StatCard
          title="Total Suppliers"
          value={dashboardStats?.totalSuppliers?.toString() || "0"}
          description={`${
            dashboardStats?.totalSuppliers || 0
          } active suppliers`}
          icon={<Truck className="h-6 w-6" />}
          actionLabel="View All"
          actionHref={ROUTES.APP.SUPPLIERS.LIST}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
