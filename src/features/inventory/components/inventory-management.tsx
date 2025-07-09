import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeleteInventoryItem,
  useInventoryItemsWithStatus,
} from "@/services/inventory/useInventory";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Clock,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const inventoryFiltersSchema = z.object({
  searchQuery: z.string().optional(),
  categoryFilter: z.string().optional(),
  brandFilter: z.string().optional(),
  supplierFilter: z.string().optional(),
});

type InventoryFiltersValues = z.infer<typeof inventoryFiltersSchema>;

export function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { mutate: deleteItem, isPending: isDeleting } =
    useDeleteInventoryItem();

  const { control, watch, reset } = useForm<InventoryFiltersValues>({
    resolver: zodResolver(inventoryFiltersSchema),
    defaultValues: {
      searchQuery: "",
      categoryFilter: "all",
      brandFilter: "",
      supplierFilter: "all",
    },
  });

  const filters = watch();

  // Convert activeTab to proper filter params
  const getStatusFilter = () => {
    if (activeTab === "low-stock") return { low_stock: true };
    if (activeTab === "out-of-stock") return { in_stock: false };
    return {};
  };

  const {
    data: inventoryItems = [],
    isLoading,
    isError,
    refetch,
  } = useInventoryItemsWithStatus(getStatusFilter());

  const getFilteredItems = () => {
    let filtered = inventoryItems || [];

    // Filter by search
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.item_name
            .toLowerCase()
            .includes(filters.searchQuery!.toLowerCase()) ||
          item.item_code
            .toString()
            .toLowerCase()
            .includes(filters.searchQuery!.toLowerCase())
      );
    }

    // Filter by category
    if (filters.categoryFilter && filters.categoryFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.category === filters.categoryFilter
      );
    }

    // Filter by brand (if the API provides brand data)
    if (filters.brandFilter && "brand" in filtered[0]) {
      filtered = filtered.filter((item) =>
        (item as any).brand
          ?.toLowerCase()
          .includes(filters.brandFilter!.toLowerCase())
      );
    }

    // Filter by supplier (if the API provides supplier data)
    if (
      filters.supplierFilter &&
      filters.supplierFilter !== "all" &&
      "supplierName" in filtered[0]
    ) {
      filtered = filtered.filter(
        (item) => (item as any).supplierName === filters.supplierFilter
      );
    }

    return filtered;
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(id, {
        onSuccess: () => {
          toast.success("Item deleted successfully");
          refetch();
        },
        onError: (error) => {
          toast.error(`Failed to delete item: ${error.message}`);
        },
      });
    }
  };

  const filteredItems = getFilteredItems();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low-stock":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "out-of-stock":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleClearFilters = () => {
    reset({
      searchQuery: "",
      categoryFilter: "all",
      brandFilter: "",
      supplierFilter: "all",
    });
  };

  const totalItems = inventoryItems?.length || 0;
  const lowStockItems =
    inventoryItems?.filter((item) => item.status === "low-stock").length || 0;
  const outOfStockItems =
    inventoryItems?.filter((item) => item.status === "out-of-stock").length ||
    0;

  // Extract unique categories from API data
  const categories = [
    { value: "all", label: "All Categories" },
    ...Array.from(
      new Set(
        inventoryItems
          ?.map((item) => item.category)
          .filter((category): category is string => !!category) || []
      )
    ).map((category) => ({ value: category, label: category })),
  ];

  // Extract unique suppliers if available in data
  const suppliers = [
    { value: "all", label: "All Suppliers" },
    ...Array.from(
      new Set(
        inventoryItems
          ?.map((item) => (item as any).supplierName)
          .filter((supplier): supplier is string => !!supplier) || []
      )
    ).map((supplier) => ({ value: supplier, label: supplier })),
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Inventory</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stock Items</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={() => navigate("/inventory/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Search & Filters</CardTitle>
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormInput
              name="searchQuery"
              label="Search"
              placeholder="Search by product name"
              control={control}
              icon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <FormSelect
              name="categoryFilter"
              label="Category"
              options={categories}
              placeholder="Select category"
              control={control}
            />
            <FormInput
              name="brandFilter"
              label="Brand"
              placeholder="Enter brand name"
              control={control}
            />
            <FormSelect
              name="supplierFilter"
              label="Supplier"
              options={suppliers}
              placeholder="Select supplier"
              control={control}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Items
                </p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Low Stock
                </p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold">{outOfStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Recent Activity
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Items ({totalItems})</TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock ({lowStockItems})
          </TabsTrigger>
          <TabsTrigger value="out-of-stock">
            Out of Stock ({outOfStockItems})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" && "All Inventory Items"}
                {activeTab === "low-stock" && "Low Stock Items"}
                {activeTab === "out-of-stock" && "Out of Stock Items"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading inventory data...</span>
                </div>
              ) : isError ? (
                <div className="flex justify-center items-center py-8 text-red-500">
                  <XCircle className="h-8 w-8 mr-2" />
                  <span>Error loading inventory data. Please try again.</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>In Stock</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.item_code}
                        </TableCell>
                        <TableCell>{item.item_name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-2">{item.unit}</span>
                          </div>
                        </TableCell>
                        <TableCell>Units</TableCell>
                        <TableCell>{item.reorder_level}</TableCell>
                        <TableCell>{item.project.name}</TableCell>
                        <TableCell>{item.last_update}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === "in-stock"
                                ? "bg-green-100 text-green-800"
                                : item.status === "low-stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status === "in-stock" && "In Stock"}
                            {item.status === "low-stock" && "Low Stock"}
                            {item.status === "out-of-stock" && "Out of Stock"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/inventory/${item.id}`)
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/inventory/edit/${item.id}`)
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Item
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteItem(item.id)}
                                disabled={isDeleting}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Item
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8">
                          No inventory items found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
