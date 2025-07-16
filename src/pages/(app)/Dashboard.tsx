"use client";

import { Button } from "@/components/ui/button";
import { ActiveProjects } from "@/features/dashboard/components/active-projects";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { InventoryStatus } from "@/features/dashboard/components/inventory-status";
import { RecentPurchaseOrders } from "@/features/dashboard/components/recent-purchase-orders";
import { useDashboardStats } from "@/services/dashboard/useDashboard";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { refetch, isFetching } = useDashboardStats();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button
          onClick={handleRefresh}
          disabled={isFetching}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <DashboardOverview />
      <ActiveProjects />
      <RecentPurchaseOrders />
      <InventoryStatus />
    </div>
  );
}
