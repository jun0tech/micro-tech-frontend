"use client";

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
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import {
  useCreateSupplier,
  useSupplier,
  useUpdateSupplier,
} from "@/services/suppliers/useSupplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Building, Mail, Phone, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
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
  status: z.enum(["active", "inactive", "pending"]),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

export default function AddEditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Hooks
  const { data: supplier, isLoading: isLoadingSupplier } = useSupplier(
    id ? parseInt(id) : 0
  );
  const { mutateAsync: createSupplier, isPending: isCreating } =
    useCreateSupplier();
  const { mutateAsync: updateSupplier, isPending: isUpdating } =
    useUpdateSupplier();

  const isLoading = isCreating || isUpdating;

  const { control, handleSubmit, reset } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      category: "",
      address: "",
      status: "active",
    },
  });

  // Reset form when supplier data is loaded
  useEffect(() => {
    if (supplier && isEditing) {
      reset({
        name: supplier.name || "",
        contact_person: supplier.contact_person || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        category: supplier.category || "",
        address: supplier.address || "",
        status: supplier.status || "active",
      });
    }
  }, [supplier, isEditing, reset]);

  const onSubmit = async (data: SupplierFormValues) => {
    try {
      if (isEditing && id) {
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
      } else {
        await createSupplier({
          ...data,
          // Convert empty strings to undefined for optional fields
          contact_person: data.contact_person || undefined,
          phone: data.phone || undefined,
          email: data.email || undefined,
          address: data.address || undefined,
        });
      }
      navigate(ROUTES.APP.SUPPLIERS.LIST);
    } catch (error) {
      // Error is handled by the hooks
      console.error("Failed to save supplier:", error);
    }
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

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending Approval" },
  ];

  if (isEditing && isLoadingSupplier) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
              {isEditing ? "Edit Supplier" : "New Supplier"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={ROUTES.APP.SUPPLIERS.LIST}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Supplier" : "Create New Supplier"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update supplier information and settings"
              : "Add a new supplier to your procurement network"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="name"
                name="name"
                label="Supplier Name"
                placeholder="Enter supplier name"
                control={control}
                required
                icon={<Building className="h-4 w-4 text-gray-400" />}
              />

              <FormSelect
                id="category"
                name="category"
                label="Category"
                options={categoryOptions}
                placeholder="Select category"
                control={control}
                required
              />

              <FormSelect
                id="status"
                name="status"
                label="Status"
                options={statusOptions}
                control={control}
                required
              />

              <div className="md:col-span-1">
                {/* Status badge for visual reference */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Status
                  </label>
                  <div>
                    <Badge
                      variant={
                        isEditing && supplier?.status === "active"
                          ? "default"
                          : supplier?.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {isEditing && supplier?.status
                        ? supplier.status.charAt(0).toUpperCase() +
                          supplier.status.slice(1)
                        : "New Supplier"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="contact_person"
                name="contact_person"
                label="Contact Person"
                placeholder="Enter contact person name"
                control={control}
                icon={<User className="h-4 w-4 text-gray-400" />}
              />

              <FormInput
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                control={control}
                icon={<Phone className="h-4 w-4 text-gray-400" />}
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter email address"
                control={control}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
            </div>

            <FormTextarea
              id="address"
              name="address"
              label="Address"
              placeholder="Enter complete address"
              control={control}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Supplier Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-2">
            <p className="text-sm">
              • Ensure all supplier information is accurate and up-to-date
            </p>
            <p className="text-sm">
              • Contact information is essential for communication
            </p>
            <p className="text-sm">
              • Choose the appropriate category for better organization
            </p>
            <p className="text-sm">
              • Set status to "Pending" for new suppliers requiring approval
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link to={ROUTES.APP.SUPPLIERS.LIST}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Supplier"
              : "Create Supplier"}
          </Button>
        </div>
      </form>
    </div>
  );
}
