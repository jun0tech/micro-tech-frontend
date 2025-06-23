import { Box, Pipette, Wrench, Zap } from "lucide-react";
import { Link } from "react-router";

interface InventoryItem {
  id: string;
  name: string;
  size: string;
  category: "Hardware" | "Plumbing" | "Electrical";
  quantity: number;
  location: string;
}

export function InventoryStatus() {
  const inventoryItems: InventoryItem[] = [
    {
      id: "INV001",
      name: "G1 Bar Saddle",
      size: "26 mm",
      category: "Hardware",
      quantity: 125,
      location: "Main Store",
    },
    {
      id: "INV002",
      name: "Hexagonal lock nut",
      size: "Standard",
      category: "Hardware",
      quantity: 350,
      location: "Main Store",
    },
    {
      id: "INV003",
      name: "Zinc die cast coupling",
      size: "Medium",
      category: "Plumbing",
      quantity: 48,
      location: "Site Store",
    },
    {
      id: "INV004",
      name: "G1 Rigid conduit pipe",
      size: "16 mm",
      category: "Electrical",
      quantity: 75,
      location: "Main Store",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Hardware":
        return <Wrench className="h-4 w-4 text-blue-600" />;
      case "Plumbing":
        return <Pipette className="h-4 w-4 text-blue-600" />;
      case "Electrical":
        return <Zap className="h-4 w-4 text-blue-600" />;
      default:
        return <Box className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inventory Status</h2>
        <Link
          to="/inventory"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Full Inventory
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.size}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      {getCategoryIcon(item.category)}
                      <span className="ml-2">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.quantity} units
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.location}
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
