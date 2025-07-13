import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { usePurchaseOrders } from "@/services/purchase/usePurchase";
import { Eye, MoreVertical, PenSquare, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function PurchaseRequests() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Use the new purchase order hook
  const {
    data: purchaseOrders = [],
    isLoading,
    error,
  } = usePurchaseOrders({
    search: searchQuery,
    status: activeTab === "all" ? undefined : activeTab,
  });

  // Filter requests based on active tab and search
  const filteredRequests = purchaseOrders.filter((order) => {
    const matchesSearch =
      !searchQuery ||
      order.po_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.project.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || order.status === activeTab;

    return matchesSearch && matchesTab;
  });

  // Format date to display in MM/DD/YYYY format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center text-red-600">
          <p>Error loading purchase requests. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Purchase Requests" },
        ]}
      />

      <h1 className="text-2xl font-bold mb-6">Purchase Requests</h1>

      {/* Search and New Request Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search requests"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Link to={ROUTES.APP.PURCHASE.NEW}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            New Request
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "all", label: "All", count: purchaseOrders.length },
            {
              key: "pending",
              label: "Pending",
              count: purchaseOrders.filter((o) => o.status === "pending")
                .length,
            },
            {
              key: "approved",
              label: "Approved",
              count: purchaseOrders.filter((o) => o.status === "approved")
                .length,
            },
            {
              key: "delivered",
              label: "Delivered",
              count: purchaseOrders.filter((o) => o.status === "delivered")
                .length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Purchase Requests Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredRequests.length === 0 ? (
            <li className="px-6 py-8 text-center text-gray-500">
              {searchQuery
                ? "No purchase requests match your search."
                : "No purchase requests found."}
            </li>
          ) : (
            filteredRequests.map((request) => (
              <li key={request.id}>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {request.po_number.split("-")[2]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {request.po_number}
                          </p>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{request.project.name}</span>
                          <span>•</span>
                          <span>{request.supplier.name}</span>
                          <span>•</span>
                          <span>{formatDate(request.order_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${request.total_amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {request.items.length} item
                        {request.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={`/purchase/order/${request.id}/details`}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <PenSquare className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>More Actions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
