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
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const addOrderItemSchema = z.object({
  itemName: z.string().min(2, "Item name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Quantity must be a positive number"
    ),
  unitPrice: z
    .string()
    .min(1, "Unit price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Unit price must be a valid number"
    ),
  supplier: z.string().min(1, "Please select a supplier"),
});

type AddOrderItemFormValues = z.infer<typeof addOrderItemSchema>;

export default function AddOrderItem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { control, handleSubmit, watch } = useForm<AddOrderItemFormValues>({
    resolver: zodResolver(addOrderItemSchema),
    defaultValues: {
      itemName: "",
      description: "",
      quantity: "",
      unitPrice: "",
      supplier: "",
    },
  });

  const quantity = watch("quantity");
  const unitPrice = watch("unitPrice");

  // Calculate total price
  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    return qty * price;
  };

  const total = calculateTotal();

  const onSubmit = (data: AddOrderItemFormValues) => {
    console.log("Order item data:", { ...data, total });
    // Add logic to save the item
    navigate(`/purchase/order/${id}`);
  };

  const handleCancel = () => {
    navigate(`/purchase/order/${id}`);
  };

  const supplierOptions = [
    { value: "abc-hardware", label: "ABC Hardware Suppliers" },
    { value: "global-tech", label: "Global Tech Solutions" },
    { value: "precision-parts", label: "Precision Parts Ltd." },
    { value: "quality-chemicals", label: "Quality Chemicals Inc." },
    { value: "eco-packaging", label: "EcoPackaging Inc." },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/purchase">Purchase Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/purchase/order/${id}`}>
              {id || "PO-2023-001"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Item</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-2">
        <Plus className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Add Order Item</h1>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Item Name */}
            <FormInput
              id="itemName"
              name="itemName"
              label="Item Name"
              placeholder="Enter item name"
              control={control}
              required
            />

            {/* Description */}
            <FormTextarea
              id="description"
              name="description"
              label="Description"
              placeholder="Enter item description"
              control={control}
              rows={3}
              required
            />

            {/* Quantity and Unit Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                min="1"
                placeholder="0"
                control={control}
                required
              />
              <FormInput
                id="unitPrice"
                name="unitPrice"
                label="Unit Price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                control={control}
                required
                icon={<span className="text-gray-500">$</span>}
              />
            </div>

            {/* Total (calculated) */}
            {(quantity || unitPrice) && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Total Amount:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Supplier */}
            <FormSelect
              id="supplier"
              name="supplier"
              label="Supplier"
              options={supplierOptions}
              placeholder="Select supplier"
              control={control}
              required
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
              >
                Add Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
