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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import {
  useSupplier,
  useUpdateSupplier,
} from "@/services/suppliers/useSupplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";

const supplierSchema = z.object({
  name: z.string().min(2, "Supplier name must be at least 2 characters"),
  contact_person: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional()
    .or(z.literal("")),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

export function SupplierDetail() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);

  // Use API hook to fetch supplier data
  const {
    data: supplier,
    isLoading,
    error,
  } = useSupplier(id ? parseInt(id) : 0);
  const { mutateAsync: updateSupplier, isPending } = useUpdateSupplier();

  const { control, handleSubmit, reset, watch } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      category: "",
      address: "",
    },
  });

  const currentValues = watch();

  // Reset form when supplier data is loaded
  useEffect(() => {
    if (supplier) {
      reset({
        name: supplier.name || "",
        contact_person: supplier.contact_person || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        category: supplier.category || "",
        address: supplier.address || "",
      });
    }
  }, [supplier, reset]);

  const onSubmit = async (data: SupplierFormValues) => {
    if (!id) return;

    try {
      await updateSupplier({
        id: parseInt(id),
        data: {
          ...data,
          // Convert empty strings to undefined for optional fields
          contact_person: data.contact_person || undefined,
          phone: data.phone || undefined,
          email: data.email || undefined,
          address: data.address || undefined,
        },
      });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update supplier:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    if (supplier) {
      reset({
        name: supplier.name || "",
        contact_person: supplier.contact_person || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        category: supplier.category || "",
        address: supplier.address || "",
      });
    }
    setEditMode(false);
  };

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "construction", label: "Construction" },
    { value: "chemicals", label: "Chemicals" },
    { value: "packaging", label: "Packaging" },
    { value: "hardware", label: "Hardware" },
    { value: "software", label: "Software" },
    { value: "services", label: "Services" },
    { value: "raw-materials", label: "Raw Materials" },
    { value: "other", label: "Other" },
  ];

  // Mock performance data - this would come from API in real implementation
  const performanceData = [
    {
      month: "Jan 2024",
      orders: 15,
      onTime: 14,
      rating: 93,
      trend: "up",
    },
    {
      month: "Feb 2024",
      orders: 18,
      onTime: 17,
      rating: 94,
      trend: "up",
    },
    {
      month: "Mar 2024",
      orders: 12,
      onTime: 11,
      rating: 92,
      trend: "down",
    },
  ];

  if (error) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600">
            Failed to load supplier: {error.message}
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

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-6 w-64" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-500">Supplier not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROUTES.APP.SUPPLIERS.LIST}>
              Suppliers
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {currentValues.name || supplier.name}
            </BreadcrumbPage>
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
              <CardTitle>Supplier Information</CardTitle>
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
                  <Button size="sm" type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    type="button"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="name"
                name="name"
                label="Supplier Name"
                control={control}
                disabled={!editMode}
                required
              />

              <FormInput
                id="contact_person"
                name="contact_person"
                label="Contact Person"
                control={control}
                disabled={!editMode}
              />

              <FormInput
                id="phone"
                name="phone"
                label="Phone Number"
                control={control}
                disabled={!editMode}
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                control={control}
                disabled={!editMode}
              />

              <FormSelect
                id="category"
                name="category"
                label="Category"
                options={categoryOptions}
                control={control}
                disabled={!editMode}
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      supplier.status === "active"
                        ? "bg-green-100 text-green-800"
                        : supplier.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {supplier.status.charAt(0).toUpperCase() +
                      supplier.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <FormTextarea
              id="address"
              name="address"
              label="Address"
              control={control}
              disabled={!editMode}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {supplier.performance_rating || 0}%
                </p>
                <p className="text-sm text-gray-500">Overall Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">45</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">42</p>
                <p className="text-sm text-gray-500">On-Time Deliveries</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>On-Time</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.orders}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{row.onTime}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          row.rating >= 95
                            ? "text-green-600"
                            : row.rating >= 90
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {row.rating}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {row.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
