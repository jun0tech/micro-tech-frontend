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
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Label } from "@/components/ui/label";
import {
  useCreateInventoryItem,
  useInventoryItem,
  useUpdateInventoryItem,
} from "@/services/inventory/useInventory";
import { useProjects } from "@/services/project/useProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const inventorySchema = z.object({
  supplierName: z.string().min(1, "Please select a supplier"),
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  brand: z.string().min(2, "Brand name must be at least 2 characters"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Quantity must be a positive number"
    ),
  unit: z.string().min(1, "Please select a unit"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  createdDate: z.string().min(1, "Created date is required"),
  rate: z
    .string()
    .min(1, "Rate is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Rate must be a valid number"
    ),
  taxableAmount: z
    .string()
    .min(1, "Taxable amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Taxable amount must be a valid number"
    ),
  vatAmount: z
    .string()
    .min(1, "VAT amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "VAT amount must be a valid number"
    ),
  totalPrice: z
    .string()
    .min(1, "Total price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Total price must be a valid number"
    ),
  remarks: z.string().optional(),
  projectId: z.string().min(1, "Project is required"),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

export function AddInventoryItem() {
  const [itemType, setItemType] = useState<"fixed" | "current">("fixed");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Determine if we're in edit mode
  const isEditMode = !!id;
  const inventoryId = id ? parseInt(id, 10) : 0;

  // Hooks for different operations
  const { mutate: createInventoryItem, isPending: isCreating } =
    useCreateInventoryItem();
  const { mutate: updateInventoryItem, isPending: isUpdating } =
    useUpdateInventoryItem();
  const { data: inventoryItem, isLoading: isLoadingItem } =
    useInventoryItem(inventoryId);
  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<InventoryFormValues>({
      resolver: zodResolver(inventorySchema),
      defaultValues: {
        supplierName: "",
        productName: "",
        category: "",
        brand: "",
        quantity: "",
        unit: "pcs",
        invoiceNumber: "",
        createdDate: "",
        rate: "",
        taxableAmount: "",
        vatAmount: "",
        totalPrice: "",
        remarks: "",
        projectId: "",
      },
    });

  // Populate form when editing and inventory item loads
  useEffect(() => {
    if (isEditMode && inventoryItem) {
      reset({
        productName: inventoryItem.item_name,
        quantity: inventoryItem.unit.toString(),
        invoiceNumber: inventoryItem.item_code.toString(),
        projectId: inventoryItem.project.id.toString(),
        category: inventoryItem.category,
        // Set defaults for fields not in API
        supplierName: "",
        brand: "",
        unit: "pcs",
        createdDate: inventoryItem.last_update || "",
        rate: "",
        taxableAmount: "",
        vatAmount: "",
        totalPrice: "",
        remarks: "",
      });
    }
  }, [isEditMode, inventoryItem, reset]);

  const onSubmit = (data: InventoryFormValues) => {
    // Find the selected project to get its description
    const selectedProject = projects.find(
      (p) => p.id.toString() === data.projectId
    );

    const inventoryData = {
      project: {
        name: selectedProject?.name || "",
        description: selectedProject?.description || "",
      },
      category: {
        brand: {
          name: data.brand,
        },
        name: data.category,
      },
      unit: {
        name: data.unit,
      },
      item_code: data.invoiceNumber,
      item_name: data.productName,
      in_stock: Number(data.quantity),
      reorder_level: 10, // Default value, adjust as needed
    };

    if (isEditMode) {
      updateInventoryItem(
        { id: inventoryId, data: inventoryData },
        {
          onSuccess: () => {
            toast.success("Inventory item updated successfully");
            navigate("/inventory");
          },
          onError: (error) => {
            toast.error(`Failed to update inventory item: ${error.message}`);
          },
        }
      );
    } else {
      createInventoryItem(inventoryData, {
        onSuccess: () => {
          toast.success("Inventory item added successfully");
          navigate("/inventory");
        },
        onError: (error) => {
          toast.error(`Failed to add inventory item: ${error.message}`);
        },
      });
    }
  };

  // Watch rate, taxable amount, and VAT to auto-calculate total
  const rate = watch("rate");
  const taxableAmount = watch("taxableAmount");
  const vatAmount = watch("vatAmount");

  // Auto-calculate total price when taxable amount and VAT change
  const handleCalculateTotal = () => {
    const taxable = parseFloat(taxableAmount) || 0;
    const vat = parseFloat(vatAmount) || 0;
    const total = taxable + vat;
    setValue("totalPrice", total.toString());
  };

  // Map projects to select options
  const projectOptions = projects.map((project) => ({
    value: project.id.toString(),
    label: project.name,
  }));

  const suppliers = [
    { value: "global-tech", label: "Global Tech Solutions" },
    { value: "ecopackaging", label: "EcoPackaging Inc." },
    { value: "precision-parts", label: "Precision Parts Ltd." },
    { value: "green-materials", label: "Green Materials Co." },
    { value: "quality-chemicals", label: "Quality Chemicals Inc." },
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "packaging", label: "Packaging" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "raw-materials", label: "Raw Materials" },
    { value: "chemicals", label: "Chemicals" },
    { value: "hardware", label: "Hardware" },
    { value: "construction", label: "Construction" },
    { value: "plumbing", label: "Plumbing" },
  ];

  const units = [
    { value: "pcs", label: "Pieces" },
    { value: "kg", label: "Kilograms" },
    { value: "meters", label: "Meters" },
    { value: "liters", label: "Liters" },
    { value: "boxes", label: "Boxes" },
    { value: "bags", label: "Bags" },
    { value: "rolls", label: "Rolls" },
    { value: "sets", label: "Sets" },
  ];

  // Loading state for edit mode
  if (isEditMode && isLoadingItem) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading inventory item...</span>
      </div>
    );
  }

  // Item not found in edit mode
  if (isEditMode && !inventoryItem && !isLoadingItem) {
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

  const isLoading = isCreating || isUpdating;
  const pageTitle = isEditMode
    ? `Edit Inventory Item${
        inventoryItem ? `: ${inventoryItem.item_name}` : ""
      }`
    : "Add New Inventory Item";
  const breadcrumbText = isEditMode ? "Edit Item" : "Add Item";
  const submitButtonText = isEditMode
    ? isUpdating
      ? "Updating..."
      : "Update Item"
    : isCreating
    ? "Saving..."
    : "Save Item";

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
            <BreadcrumbPage>{breadcrumbText}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <h1 className="text-2xl font-bold">{pageTitle}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Item Type */}
        <Card>
          <CardHeader>
            <CardTitle>Item Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-8">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="fixed-assets"
                  checked={itemType === "fixed"}
                  onCheckedChange={() => setItemType("fixed")}
                />
                <Label htmlFor="fixed-assets" className="text-sm font-medium">
                  Fixed Assets
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="current-assets"
                  checked={itemType === "current"}
                  onCheckedChange={() => setItemType("current")}
                />
                <Label htmlFor="current-assets" className="text-sm font-medium">
                  Current Assets
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project */}
            <FormSelect
              id="project"
              name="projectId"
              label="Project"
              options={projectOptions}
              placeholder={
                isLoadingProjects ? "Loading projects..." : "Select project"
              }
              control={control}
              required
              disabled={isLoadingProjects}
            />

            {/* Supplier Name */}
            <FormSelect
              id="supplier"
              name="supplierName"
              label="Supplier Name"
              options={suppliers}
              placeholder="Select supplier"
              control={control}
              required
            />

            {/* Product Image */}
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center bg-muted/20">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop an image or click to upload
                </p>
                <Button variant="outline" type="button">
                  Upload
                </Button>
              </div>
            </div>

            {/* Product Name */}
            <FormInput
              id="productName"
              name="productName"
              label="Product Name"
              placeholder="Enter product name"
              control={control}
              required
            />

            {/* Category */}
            <FormSelect
              id="category"
              name="category"
              label="Category"
              options={categories}
              placeholder="Select category"
              control={control}
              required
            />

            {/* Brand */}
            <FormInput
              id="brand"
              name="brand"
              label="Brand"
              placeholder="Enter brand name"
              control={control}
              required
            />

            {/* Quantity and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                control={control}
                required
              />
              <FormSelect
                id="unit"
                name="unit"
                label="Unit"
                options={units}
                placeholder="Select unit"
                control={control}
                required
              />
            </div>

            {/* Invoice Number */}
            <FormInput
              id="invoiceNumber"
              name="invoiceNumber"
              label="Invoice Number"
              placeholder="Enter invoice number"
              control={control}
              required
            />

            {/* Created Date */}
            <FormInput
              id="createdDate"
              name="createdDate"
              label="Created Date"
              type="date"
              control={control}
              required
              icon={<Calendar className="h-5 w-5 text-gray-400" />}
            />
          </CardContent>
        </Card>

        {/* Pricing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id="rate"
                name="rate"
                label="Rate"
                type="number"
                step="0.01"
                placeholder="Enter rate"
                control={control}
                required
              />
              <FormInput
                id="taxableAmount"
                name="taxableAmount"
                label="Taxable Amount"
                type="number"
                step="0.01"
                placeholder="Enter taxable amount"
                control={control}
                required
                helperText="Amount before VAT"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id="vatAmount"
                name="vatAmount"
                label="VAT Amount"
                type="number"
                step="0.01"
                placeholder="Enter VAT amount"
                control={control}
                required
              />
              <div className="flex items-end gap-2">
                <FormInput
                  id="totalPrice"
                  name="totalPrice"
                  label="Total Price"
                  type="number"
                  step="0.01"
                  placeholder="Enter total price"
                  control={control}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCalculateTotal}
                  className="mb-6"
                >
                  Calculate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remarks */}
        <Card>
          <CardContent className="pt-6">
            <FormTextarea
              id="remarks"
              name="remarks"
              label="Remarks"
              placeholder="Enter any additional notes or remarks"
              control={control}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitButtonText}
              </>
            ) : (
              submitButtonText
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/inventory")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
