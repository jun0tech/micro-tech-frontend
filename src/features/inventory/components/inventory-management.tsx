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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

interface InventoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  inStock: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
  brand: string;
  supplierName: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const inventoryFiltersSchema = z.object({
  searchQuery: z.string().optional(),
  categoryFilter: z.string().optional(),
  brandFilter: z.string().optional(),
  supplierFilter: z.string().optional(),
});

type InventoryFiltersValues = z.infer<typeof inventoryFiltersSchema>;

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    itemCode: "INV-1001",
    itemName: "Oil Bar Saddle",
    category: "Electrical",
    inStock: 145,
    unit: "Pieces",
    reorderLevel: 50,
    lastUpdated: "2023-11-15",
    brand: "TechCorp",
    supplierName: "Global Tech Solutions",
    status: "in-stock",
  },
  {
    id: "2",
    itemCode: "INV-1002",
    itemName: "Copper Wire",
    category: "Electrical",
    inStock: 320,
    unit: "Meters",
    reorderLevel: 100,
    lastUpdated: "2023-11-12",
    brand: "WirePro",
    supplierName: "EcoPackaging Inc.",
    status: "in-stock",
  },
  {
    id: "3",
    itemCode: "INV-1003",
    itemName: "Cement",
    category: "Construction",
    inStock: 24,
    unit: "Bags",
    reorderLevel: 30,
    lastUpdated: "2023-11-10",
    brand: "CementMax",
    supplierName: "Green Materials Co.",
    status: "low-stock",
  },
  {
    id: "4",
    itemCode: "INV-1004",
    itemName: "Steel Rods",
    category: "Construction",
    inStock: 75,
    unit: "Pieces",
    reorderLevel: 25,
    lastUpdated: "2023-11-08",
    brand: "SteelPro",
    supplierName: "Precision Parts Ltd.",
    status: "in-stock",
  },
  {
    id: "5",
    itemCode: "INV-1005",
    itemName: "PVC Pipes",
    category: "Plumbing",
    inStock: 0,
    unit: "Pieces",
    reorderLevel: 20,
    lastUpdated: "2023-11-05",
    brand: "PipeMaster",
    supplierName: "Quality Chemicals Inc.",
    status: "out-of-stock",
  },
  {
    id: "6",
    itemCode: "INV-1006",
    itemName: "Circuit Breakers",
    category: "Electrical",
    inStock: 42,
    unit: "Pieces",
    reorderLevel: 15,
    lastUpdated: "2023-11-03",
    brand: "ElectricSafe",
    supplierName: "Global Tech Solutions",
    status: "in-stock",
  },
  {
    id: "7",
    itemCode: "INV-1007",
    itemName: "Bolts and Nuts",
    category: "Hardware",
    inStock: 540,
    unit: "Pieces",
    reorderLevel: 200,
    lastUpdated: "2023-11-01",
    brand: "FastenPro",
    supplierName: "Precision Parts Ltd.",
    status: "in-stock",
  },
];

export function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

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

  const getFilteredItems = () => {
    let filtered = mockInventoryItems;

    // Filter by tab
    if (activeTab === "low-stock") {
      filtered = filtered.filter((item) => item.status === "low-stock");
    } else if (activeTab === "out-of-stock") {
      filtered = filtered.filter((item) => item.status === "out-of-stock");
    }

    // Filter by search
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.itemName
            .toLowerCase()
            .includes(filters.searchQuery!.toLowerCase()) ||
          item.itemCode
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

    // Filter by brand
    if (filters.brandFilter) {
      filtered = filtered.filter((item) =>
        item.brand.toLowerCase().includes(filters.brandFilter!.toLowerCase())
      );
    }

    // Filter by supplier
    if (filters.supplierFilter && filters.supplierFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.supplierName === filters.supplierFilter
      );
    }

    return filtered;
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

  const totalItems = mockInventoryItems.length;
  const lowStockItems = mockInventoryItems.filter(
    (item) => item.status === "low-stock"
  ).length;
  const outOfStockItems = mockInventoryItems.filter(
    (item) => item.status === "out-of-stock"
  ).length;

  const categories = [
    { value: "all", label: "All Categories" },
    ...Array.from(new Set(mockInventoryItems.map((item) => item.category))).map(
      (category) => ({ value: category, label: category })
    ),
  ];

  const suppliers = [
    { value: "all", label: "All Suppliers" },
    ...Array.from(
      new Set(mockInventoryItems.map((item) => item.supplierName))
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.itemCode}
                      </TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <span className="ml-2">{item.inStock}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.reorderLevel}</TableCell>
                      <TableCell>{item.supplierName}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
