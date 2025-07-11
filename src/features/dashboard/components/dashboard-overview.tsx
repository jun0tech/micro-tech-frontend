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
}: StatCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 flex flex-col h-full relative overflow-hidden">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Active Projects"
          value="8"
          description="8 projects in progress"
          icon={<Folder className="h-6 w-6" />}
          actionLabel="View All"
          actionHref="/projects"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Pending Orders"
          value="12"
          description="12 orders awaiting approval"
          icon={<ClipboardList className="h-6 w-6" />}
          actionLabel="Review"
          actionHref="/purchase"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Low Stock Items"
          value="5"
          description="5 items below threshold"
          icon={<AlertTriangle className="h-6 w-6" />}
          actionLabel="Restock"
          actionHref="/inventory"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Recent Deliveries"
          value="3"
          description="3 deliveries in last 24 hours"
          icon={<Truck className="h-6 w-6" />}
          actionLabel="Details"
          actionHref="/deliveries"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>
    </div>
  );
}
