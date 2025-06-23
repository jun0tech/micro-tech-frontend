import { Link } from "react-router";

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  amount: number;
  status: "Pending" | "Approved" | "Delivered" | "Processing";
}

export function RecentPurchaseOrders() {
  const orders: PurchaseOrder[] = [
    {
      id: "PO-2023-001",
      supplier: "Hyatt Regency",
      items: 12,
      amount: 4580.0,
      status: "Pending",
    },
    {
      id: "PO-2023-002",
      supplier: "Marriot",
      items: 8,
      amount: 2145.0,
      status: "Approved",
    },
    {
      id: "PO-2023-003",
      supplier: "DAV School",
      items: 15,
      amount: 5876.0,
      status: "Delivered",
    },
    {
      id: "PO-2023-004",
      supplier: "Hyatt Regency",
      items: 5,
      amount: 1235.0,
      status: "Processing",
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Purchase Orders</h2>
        <Link
          to="/purchase"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Purchase Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.supplier}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.items} Items
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
