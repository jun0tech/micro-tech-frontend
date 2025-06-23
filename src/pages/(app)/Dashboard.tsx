"use client";

import { ActiveProjects } from "@/features/dashboard/components/active-projects";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { InventoryStatus } from "@/features/dashboard/components/inventory-status";
import { RecentPurchaseOrders } from "@/features/dashboard/components/recent-purchase-orders";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardOverview />
      <ActiveProjects />
      <RecentPurchaseOrders />
      <InventoryStatus />
    </div>
  );
}
