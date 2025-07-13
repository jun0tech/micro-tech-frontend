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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";
import { useSuppliers } from "@/services/suppliers/useSupplier";
import { Edit, Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  // Use API hook instead of mock data
  const {
    data: suppliers,
    isLoading,
    error,
  } = useSuppliers({
    search: searchQuery || undefined,
    status: activeTab === "all" ? undefined : activeTab,
  });

  const getFilteredSuppliers = () => {
    if (!suppliers) return [];

    let filtered = suppliers;

    // Filter by tab (if not already filtered by API)
    if (activeTab !== "all") {
      filtered = filtered.filter((supplier) => supplier.status === activeTab);
    }

    // Filter by search (if not already filtered by API)
    if (searchQuery) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (supplier.category &&
            supplier.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (supplier.address &&
            supplier.address.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredSuppliers = getFilteredSuppliers();

  const getPerformanceColor = (performance?: number) => {
    if (!performance) return "text-gray-600";
    if (performance >= 95) return "text-green-600";
    if (performance >= 90) return "text-blue-600";
    if (performance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">
            Failed to load suppliers: {error.message}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.APP.DASHBOARD}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.APP.SUPPLIERS.LIST}>
              Suppliers
            </BreadcrumbLink>
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
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Link to={ROUTES.APP.SUPPLIERS.NEW}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </Link>
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
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">
                Total Suppliers
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  suppliers?.length || 0
                )}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Active</h3>
              <p className="text-2xl font-bold text-green-600">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  suppliers?.filter((s) => s.status === "active").length || 0
                )}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  suppliers?.filter((s) => s.status === "pending").length || 0
                )}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
              <p className="text-2xl font-bold text-red-600">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  suppliers?.filter((s) => s.status === "inactive").length || 0
                )}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500">No suppliers found</p>
                      {searchQuery && (
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search terms
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {supplier.category || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {supplier.contact_person && (
                            <p className="text-sm font-medium">
                              {supplier.contact_person}
                            </p>
                          )}
                          {supplier.email && (
                            <p className="text-xs text-gray-500">
                              {supplier.email}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            supplier.status
                          )}`}
                        >
                          {supplier.status.charAt(0).toUpperCase() +
                            supplier.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getPerformanceColor(
                            supplier.performance_rating
                          )}`}
                        >
                          {supplier.performance_rating
                            ? `${supplier.performance_rating}%`
                            : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {supplier.last_order_date
                          ? new Date(
                              supplier.last_order_date
                            ).toLocaleDateString()
                          : "No orders"}
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
                                navigate(ROUTES.APP.SUPPLIERS.VIEW(supplier.id))
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(ROUTES.APP.SUPPLIERS.EDIT(supplier.id))
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {isLoading
                ? "..."
                : `1-${filteredSuppliers.length} of ${filteredSuppliers.length}`}{" "}
              suppliers
            </p>
            <div className="flex space-x-2">
              <Button variant="outline">Export CSV</Button>
              <Link to={ROUTES.APP.SUPPLIERS.LIST}>
                <Button variant="outline">Back to All</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
