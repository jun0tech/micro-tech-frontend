import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const orderItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .int("Quantity must be a whole number"),
  price: z.number().min(0, "Price must be a positive number"),
});

const createPurchaseOrderSchema = z.object({
  poNumber: z.string().optional(),
  orderDate: z.string().min(1, "Order date is required"),
  supplier: z.string().min(1, "Please select a supplier"),
  deliveryAddress: z
    .string()
    .min(5, "Delivery address must be at least 5 characters"),
  expectedDeliveryDate: z.string().min(1, "Expected delivery date is required"),
  paymentTerms: z.string().min(1, "Please select payment terms"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
  requestedBy: z
    .string()
    .min(2, "Requested by name must be at least 2 characters"),
  department: z.string().min(1, "Please select a department"),
});

type CreatePurchaseOrderFormValues = z.infer<typeof createPurchaseOrderSchema>;

export default function CreatePurchaseOrder() {
  const { control, handleSubmit, watch } =
    useForm<CreatePurchaseOrderFormValues>({
      resolver: zodResolver(createPurchaseOrderSchema),
      defaultValues: {
        poNumber: "",
        orderDate: new Date().toISOString().split("T")[0],
        supplier: "",
        deliveryAddress: "",
        expectedDeliveryDate: "",
        paymentTerms: "",
        items: [{ name: "", quantity: 1, price: 0 }],
        notes: "",
        requestedBy: "",
        department: "",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  // Calculate total for each item and overall total
  const calculateItemTotal = (quantity: number, price: number) => {
    return quantity * price;
  };

  const calculateOrderTotal = () => {
    return watchedItems.reduce((sum, item) => {
      return sum + calculateItemTotal(item.quantity || 0, item.price || 0);
    }, 0);
  };

  const onSubmit = (data: CreatePurchaseOrderFormValues) => {
    console.log("Purchase Order created:", data);
    // Add save logic here
  };

  const addItem = () => {
    append({ name: "", quantity: 1, price: 0 });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const supplierOptions = [
    { value: "hyatt-regency", label: "Hyatt Regency" },
    { value: "marriot", label: "Marriot" },
    { value: "dav-school", label: "DAV School" },
  ];

  const paymentTermsOptions = [
    { value: "net-30", label: "Net 30" },
    { value: "net-60", label: "Net 60" },
    { value: "cod", label: "Cash on Delivery" },
  ];

  const departmentOptions = [
    { value: "procurement", label: "Procurement" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "it", label: "IT" },
  ];

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Purchase Orders", href: "/purchase" },
          { label: "New Order" },
        ]}
      />

      <h1 className="text-2xl font-bold mb-6">Create Purchase Order</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="poNumber"
                name="poNumber"
                label="PO Number"
                placeholder="Auto-generated"
                control={control}
                disabled
              />

              <FormInput
                id="orderDate"
                name="orderDate"
                label="Order Date"
                type="date"
                control={control}
                required
              />

              <FormSelect
                id="supplier"
                name="supplier"
                label="Supplier"
                options={supplierOptions}
                placeholder="Select supplier"
                control={control}
                required
              />

              <FormInput
                id="deliveryAddress"
                name="deliveryAddress"
                label="Delivery Address"
                placeholder="Enter delivery address"
                control={control}
                required
              />

              <FormInput
                id="expectedDeliveryDate"
                name="expectedDeliveryDate"
                label="Expected Delivery Date"
                type="date"
                control={control}
                required
              />

              <FormSelect
                id="paymentTerms"
                name="paymentTerms"
                label="Payment Terms"
                options={paymentTermsOptions}
                placeholder="Select payment terms"
                control={control}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Items</h2>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 w-10">#</th>
                    <th className="text-left py-2">Item Name</th>
                    <th className="text-left py-2 w-24">Quantity</th>
                    <th className="text-left py-2 w-32">Unit Price</th>
                    <th className="text-left py-2 w-32">Total</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id} className="border-b">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">
                        <FormInput
                          label="Item Name"
                          name={`items.${index}.name`}
                          placeholder="Enter item name"
                          control={control}
                          className="border-gray-300"
                        />
                      </td>
                      <td className="py-2">
                        <FormInput
                          label="Quantity"
                          name={`items.${index}.quantity`}
                          type="number"
                          min="1"
                          control={control}
                          className="border-gray-300"
                        />
                      </td>
                      <td className="py-2">
                        <FormInput
                          label="Unit Price"
                          name={`items.${index}.price`}
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          control={control}
                          className="border-gray-300"
                        />
                      </td>
                      <td className="py-2 font-medium">
                        $
                        {calculateItemTotal(
                          watchedItems[index]?.quantity || 0,
                          watchedItems[index]?.price || 0
                        ).toFixed(2)}
                      </td>
                      <td className="py-2 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={fields.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2">
                    <td colSpan={4} className="py-2 text-right font-semibold">
                      Order Total:
                    </td>
                    <td className="py-2 font-bold text-lg">
                      ${calculateOrderTotal().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">
              Additional Information
            </h2>

            <div className="space-y-6">
              <FormTextarea
                id="notes"
                name="notes"
                label="Notes"
                placeholder="Enter any additional information or special instructions"
                control={control}
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="requestedBy"
                  name="requestedBy"
                  label="Requested By"
                  placeholder="Your name"
                  control={control}
                  required
                />

                <FormSelect
                  id="department"
                  name="department"
                  label="Department"
                  options={departmentOptions}
                  placeholder="Select department"
                  control={control}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit">Submit Order</Button>
        </div>
      </form>
    </div>
  );
}
