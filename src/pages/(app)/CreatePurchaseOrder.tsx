"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

interface OrderItem {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const purchaseOrderSchema = z.object({
  poNumber: z.string().min(1, "PO Number is required"),
  orderDate: z.string().min(1, "Order date is required"),
  supplier: z.string().min(1, "Please select a supplier"),
  deliveryAddress: z
    .string()
    .min(5, "Delivery address must be at least 5 characters"),
  expectedDeliveryDate: z.string().min(1, "Expected delivery date is required"),
  department: z.string().min(1, "Please select a department"),
  paymentTerms: z.string().min(1, "Please select payment terms"),
  priority: z.string().min(1, "Please select priority"),
  remarks: z.string().optional(),
});

type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

export default function CreatePurchaseOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      poNumber: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(
        -6
      )}`,
      orderDate: new Date().toISOString().split("T")[0],
      supplier: "",
      deliveryAddress: "",
      expectedDeliveryDate: "",
      department: "",
      paymentTerms: "",
      priority: "medium",
      remarks: "",
    },
  });

  const onSubmit = (data: PurchaseOrderFormValues) => {
    console.log("Purchase Order submitted:", { ...data, items: orderItems });
    // Add save logic here
    navigate("/purchase");
  };

  const supplierOptions = [
    { value: "hyatt-regency", label: "Hyatt Regency" },
    { value: "marriot", label: "Marriot" },
    { value: "dav-school", label: "DAV School" },
    { value: "global-tech", label: "Global Tech Solutions" },
    { value: "ecopackaging", label: "EcoPackaging Inc." },
  ];

  const departmentOptions = [
    { value: "procurement", label: "Procurement" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "it", label: "IT" },
    { value: "hr", label: "Human Resources" },
  ];

  const paymentTermsOptions = [
    { value: "net-30", label: "Net 30" },
    { value: "net-60", label: "Net 60" },
    { value: "cod", label: "Cash on Delivery" },
    { value: "advance", label: "Advance Payment" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      itemName: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateGrandTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/purchase">Purchase Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Order</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <h1 className="text-2xl font-bold">Create Purchase Order</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="PO Number"
                name="poNumber"
                placeholder="Auto-generated"
                control={control}
                disabled
              />

              <FormInput
                label="Order Date"
                name="orderDate"
                type="date"
                control={control}
                required
              />

              <FormSelect
                label="Supplier"
                name="supplier"
                options={supplierOptions}
                placeholder="Select supplier"
                control={control}
                required
              />

              <FormInput
                label="Delivery Address"
                name="deliveryAddress"
                placeholder="Enter delivery address"
                control={control}
                required
              />

              <FormInput
                label="Expected Delivery Date"
                name="expectedDeliveryDate"
                type="date"
                control={control}
                required
              />

              <FormSelect
                label="Department"
                name="department"
                options={departmentOptions}
                placeholder="Select department"
                control={control}
                required
              />

              <FormSelect
                label="Payment Terms"
                name="paymentTerms"
                options={paymentTermsOptions}
                placeholder="Select payment terms"
                control={control}
                required
              />

              <FormSelect
                label="Priority"
                name="priority"
                options={priorityOptions}
                placeholder="Select priority"
                control={control}
                required
              />
            </div>

            <div className="mt-6">
              <FormTextarea
                label="Remarks"
                name="remarks"
                placeholder="Enter any additional notes"
                control={control}
                helperText="Optional notes about this purchase order"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order Items</CardTitle>
              <Button type="button" onClick={addOrderItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {orderItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No items added yet. Click "Add Item" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Item Name</TableHead>
                      <TableHead className="w-24">Quantity</TableHead>
                      <TableHead className="w-32">Unit Price</TableHead>
                      <TableHead className="w-32">Total</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <input
                            type="text"
                            value={item.itemName}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "itemName",
                                e.target.value
                              )
                            }
                            placeholder="Enter item name"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                            min="1"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "unitPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            min="0"
                            step="0.01"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            ₹{item.total.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOrderItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Order Summary */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{calculateGrandTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (18%):</span>
                      <span>₹{(calculateGrandTotal() * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>
                          ₹{(calculateGrandTotal() * 1.18).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/purchase")}
              >
                Cancel
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">Create Purchase Order</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
