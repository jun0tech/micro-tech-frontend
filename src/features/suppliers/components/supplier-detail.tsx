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
import { ArrowDown, ArrowUp, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";

const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name must be at least 2 characters"),
  id: z.string().min(1, "Supplier ID is required"),
  contact: z
    .string()
    .min(2, "Contact person name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  remarks: z.string().optional(),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

export function SupplierDetail() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);

  // Mock data - replace with actual data fetching
  const mockSupplier: SupplierFormValues = {
    name: "Global Tech Solutions",
    id: "SUP-001",
    contact: "John Smith",
    phone: "+91 9876543210",
    email: "john.smith@globaltech.com",
    category: "Electronics",
    address: "123 Tech Park, Electronic City, Bangalore - 560100",
    remarks: "Reliable supplier with excellent delivery record.",
  };

  const { control, handleSubmit, reset, watch } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: mockSupplier,
  });

  const currentValues = watch();

  const onSubmit = (data: SupplierFormValues) => {
    console.log("Supplier updated:", data);
    setEditMode(false);
    // Add save logic here
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    reset(mockSupplier);
    setEditMode(false);
  };

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "construction", label: "Construction" },
    { value: "chemicals", label: "Chemicals" },
    { value: "packaging", label: "Packaging" },
    { value: "hardware", label: "Hardware" },
  ];

  // Helper for rendering fields
  const renderField = (
    label: string,
    value: string,
    field: keyof SupplierFormValues,
    type = "text"
  ) => {
    if (editMode) {
      if (field === "remarks") {
        return (
          <div className="flex flex-col">
            <FormTextarea
              name={field}
              label={label}
              control={control}
              rows={3}
            />
          </div>
        );
      }
      if (field === "category") {
        return (
          <div className="flex flex-col">
            <FormSelect
              name={field}
              label={label}
              options={categoryOptions}
              control={control}
            />
          </div>
        );
      }
      return (
        <div className="flex flex-col">
          <FormInput name={field} label={label} type={type} control={control} />
        </div>
      );
    }
    // Read-only mode
    return (
      <div className="flex flex-col">
        <label className="block text-xs font-medium mb-1">{label}</label>
        <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/suppliers">Suppliers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentValues.name}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Status Flow */}
        <Card className="bg-muted/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Status Flow</CardTitle>
              {!editMode && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleEdit}
                  type="button"
                >
                  Edit
                </Button>
              )}
              {editMode && (
                <div className="flex gap-2">
                  <Button size="sm" type="submit">
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">Active</span>
                </div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-sm text-muted-foreground">Pending</span>
                </div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Inactive
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">Nov 15, 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Procurement Details */}
        <Card>
          <CardHeader>
            <CardTitle>Procurement Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Total Orders
                </label>
                <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                  45
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Total Value
                </label>
                <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                  ₹12,50,000
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                  Active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Information */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("Supplier Name", currentValues.name, "name")}
              {renderField("Supplier ID", currentValues.id, "id")}
              {renderField("Contact Person", currentValues.contact, "contact")}
              {renderField("Contact Number", currentValues.phone, "phone")}
              {renderField("Email", currentValues.email, "email", "email")}
              {renderField("Category", currentValues.category, "category")}
              <div className="md:col-span-2">
                {renderField("Address", currentValues.address, "address")}
              </div>
              <div className="md:col-span-2">
                {renderField("Remarks", currentValues.remarks || "", "remarks")}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Supply Chain Information */}
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">
                Lead Time
              </label>
              <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                5-7 business days
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Payment Terms
              </label>
              <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                Net 30 days
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Minimum Order Value
              </label>
              <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                ₹10,000
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Delivery Areas
              </label>
              <div className="bg-white border-b border-border px-3 py-2 text-sm select-text">
                Pan India
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ORD-2023-001</TableCell>
                <TableCell>Nov 10, 2023</TableCell>
                <TableCell>5</TableCell>
                <TableCell>₹25,000</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Delivered
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">95%</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-2023-002</TableCell>
                <TableCell>Nov 5, 2023</TableCell>
                <TableCell>3</TableCell>
                <TableCell>₹18,500</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                    In Transit
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">92%</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ORD-2023-003</TableCell>
                <TableCell>Oct 28, 2023</TableCell>
                <TableCell>8</TableCell>
                <TableCell>₹42,000</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Delivered
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">98%</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
