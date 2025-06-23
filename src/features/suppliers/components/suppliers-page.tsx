import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  lastOrder: string;
  performance: number;
  status: "active" | "inactive" | "pending";
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Global Tech Solutions",
    category: "Electronics",
    location: "New York, USA",
    lastOrder: "May 15, 2023",
    performance: 98,
    status: "active",
  },
  {
    id: "2",
    name: "EcoPackaging Inc.",
    category: "Packaging",
    location: "Toronto, Canada",
    lastOrder: "May 12, 2023",
    performance: 95,
    status: "active",
  },
  {
    id: "3",
    name: "Precision Parts Ltd.",
    category: "Manufacturing",
    location: "Chicago, USA",
    lastOrder: "May 10, 2023",
    performance: 92,
    status: "active",
  },
  {
    id: "4",
    name: "Green Materials Co.",
    category: "Raw Materials",
    location: "Seattle, USA",
    lastOrder: "May 8, 2023",
    performance: 94,
    status: "active",
  },
  {
    id: "5",
    name: "Quality Chemicals Inc.",
    category: "Chemicals",
    location: "Houston, USA",
    lastOrder: "May 2, 2023",
    performance: 89,
    status: "active",
  },
];

export function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  const getFilteredSuppliers = () => {
    let filtered = mockSuppliers;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((supplier) => supplier.status === activeTab);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredSuppliers = getFilteredSuppliers();

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return "text-green-600";
    if (performance >= 90) return "text-blue-600";
    if (performance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/suppliers">Suppliers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Active Suppliers</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Tabs and Search */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Suppliers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          </TabsList>

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search active suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value={activeTab}>
          {/* Results count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredSuppliers.length} active suppliers found
            </p>
          </div>

          {/* Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {supplier.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <span>{supplier.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.location}</TableCell>
                    <TableCell>{supplier.lastOrder}</TableCell>
                    <TableCell>
                      <span
                        className={getPerformanceColor(supplier.performance)}
                      >
                        {supplier.performance}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/suppliers/${supplier.id}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredSuppliers.length} of {filteredSuppliers.length}{" "}
              active suppliers
            </p>
            <div className="flex space-x-2">
              <Button variant="outline">Export CSV</Button>
              <Button variant="outline">Back to All</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
