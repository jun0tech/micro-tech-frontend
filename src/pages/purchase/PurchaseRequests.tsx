import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, PenSquare, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface PurchaseRequest {
  id: string;
  project: string;
  division: string;
  date: string;
  items: number;
  amount: string;
  status: "Approved" | "Pending" | "Rejected";
}

export default function PurchaseRequests() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data for purchase requests
  const purchaseRequests: PurchaseRequest[] = [
    {
      id: "PR-2023-0125",
      project: "Nagdhunga Tunnel",
      division: "Electrical",
      date: "2023-11-10",
      items: 5,
      amount: "$1,810.00",
      status: "Approved",
    },
    {
      id: "PR-2023-0124",
      project: "Highway Bridge",
      division: "Civil",
      date: "2023-11-08",
      items: 8,
      amount: "$3,450.00",
      status: "Approved",
    },
    {
      id: "PR-2023-0123",
      project: "Nagdhunga Tunnel",
      division: "Mechanical",
      date: "2023-11-05",
      items: 3,
      amount: "$950.00",
      status: "Pending",
    },
    {
      id: "PR-2023-0122",
      project: "City Hospital",
      division: "Electrical",
      date: "2023-11-03",
      items: 12,
      amount: "$4,200.00",
      status: "Approved",
    },
    {
      id: "PR-2023-0121",
      project: "Highway Bridge",
      division: "Civil",
      date: "2023-11-01",
      items: 6,
      amount: "$2,100.00",
      status: "Rejected",
    },
    {
      id: "PR-2023-0120",
      project: "City Hospital",
      division: "Plumbing",
      date: "2023-10-28",
      items: 4,
      amount: "$780.00",
      status: "Approved",
    },
    {
      id: "PR-2023-0119",
      project: "Nagdhunga Tunnel",
      division: "Electrical",
      date: "2023-10-25",
      items: 7,
      amount: "$1,950.00",
      status: "Approved",
    },
  ];

  // Filter requests based on active tab
  const filteredRequests = purchaseRequests.filter((request) => {
    if (activeTab === "all") return true;
    return request.status.toLowerCase() === activeTab.toLowerCase();
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
        <Link to="/purchase/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            New Request
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Requests
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "pending"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "approved"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "rejected"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Rejected
          </button>
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Division
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {request.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {request.project}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {request.division}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {formatDate(request.date)}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {request.items}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {request.amount}
                </td>
                <td className="py-4 px-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <Link
                      to={`/purchase/order/${request.id}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button className="text-gray-600 hover:text-gray-900">
                      <PenSquare className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">Showing 1-7 of 24 results</div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
