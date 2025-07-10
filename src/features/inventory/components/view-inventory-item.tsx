import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryItem } from "@/services/inventory/useInventory";
import {
  ArrowLeft,
  Building,
  Calendar,
  Edit,
  Hash,
  Loader2,
  Package,
  Tag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

export function ViewInventoryItem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const inventoryId = id ? parseInt(id, 10) : 0;

  const { data: inventoryItem, isLoading: isLoadingItem } =
    useInventoryItem(inventoryId);

  const getStatusColor = (
    inStock: boolean,
    quantity: number,
    reorderLevel: number
  ) => {
    if (quantity === 0) return "destructive";
    if (quantity <= reorderLevel) return "warning";
    return "default";
  };

  const getStatusText = (
    inStock: boolean,
    quantity: number,
    reorderLevel: number
  ) => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= reorderLevel) return "Low Stock";
    return "In Stock";
  };

  if (isLoadingItem) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading inventory item...</span>
      </div>
    );
  }

  if (!inventoryItem) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Inventory item not found</p>
        <Button
          onClick={() => navigate("/inventory")}
          className="mt-4"
          variant="outline"
        >
          Back to Inventory
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Item Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/inventory")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{inventoryItem.item_name}</h1>
            <p className="text-muted-foreground">
              Item Code: {inventoryItem.item_code}
            </p>
          </div>
        </div>
        <Button onClick={() => navigate(`/inventory/edit/${inventoryItem.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Item
        </Button>
      </div>

      {/* Status Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge
                  variant={
                    getStatusColor(
                      inventoryItem.in_stock,
                      inventoryItem.unit,
                      inventoryItem.reorder_level
                    ) as "default" | "destructive"
                  }
                  className="mt-1"
                >
                  {getStatusText(
                    inventoryItem.in_stock,
                    inventoryItem.unit,
                    inventoryItem.reorder_level
                  )}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Hash className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Quantity
                </p>
                <p className="text-xl font-bold">{inventoryItem.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Reorder Level
                </p>
                <p className="text-xl font-bold">
                  {inventoryItem.reorder_level}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-xl font-bold">{inventoryItem.last_update}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Item Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Item Name
                </Label>
                <p className="text-sm font-medium">{inventoryItem.item_name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Item Code
                </Label>
                <p className="text-sm font-medium">{inventoryItem.item_code}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Category
                </Label>
                <p className="text-sm font-medium">{inventoryItem.category}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  In Stock
                </Label>
                <Badge
                  variant={inventoryItem.in_stock ? "default" : "destructive"}
                >
                  {inventoryItem.in_stock ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-blue-600" />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Project
                </Label>
                <p className="text-sm font-medium">
                  {inventoryItem.project.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: {inventoryItem.project.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Stock</span>
              <span className="text-lg font-bold">
                {inventoryItem.unit} units
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Reorder Level</span>
              <span className="text-lg font-bold">
                {inventoryItem.reorder_level} units
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  inventoryItem.unit <= inventoryItem.reorder_level
                    ? inventoryItem.unit === 0
                      ? "bg-red-600"
                      : "bg-yellow-600"
                    : "bg-green-600"
                }`}
                style={{
                  width: `${Math.min(
                    (inventoryItem.unit / (inventoryItem.reorder_level * 2)) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>Reorder Level ({inventoryItem.reorder_level})</span>
              <span>Safe Level ({inventoryItem.reorder_level * 2}+)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </Label>
              <p className="text-sm font-medium">{inventoryItem.last_update}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Item ID
              </Label>
              <p className="text-sm font-medium">{inventoryItem.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add missing Label component import or create simple one
function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
