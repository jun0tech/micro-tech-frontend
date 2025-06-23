import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  Calendar,
  Copy,
  FileText,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Role {
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface ActivityLog {
  date: string;
  time: string;
  action: string;
  ip: string;
}

const userProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(1, "Please select a department"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  employeeId: z.string().min(1, "Employee ID is required"),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<string>("assigned");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { control, handleSubmit, reset, watch } =
    useForm<UserProfileFormValues>({
      resolver: zodResolver(userProfileSchema),
      defaultValues: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+1 (555) 123-4567",
        department: "procurement",
        position: "Procurement Manager",
        employeeId: "EMP-2023-0042",
      },
    });

  const currentValues = watch();

  const onSubmit = (data: UserProfileFormValues) => {
    console.log("User profile updated:", data);
    setEditMode(false);
    // Add save logic here
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    reset();
    setEditMode(false);
  };

  const departmentOptions = [
    { value: "procurement", label: "Procurement" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "it", label: "IT" },
    { value: "hr", label: "Human Resources" },
    { value: "management", label: "Management" },
  ];

  // Mock data for roles
  const roles: Role[] = [
    {
      name: "Procurement Manager",
      description: "Full access to procurement module and reporting",
      icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
      enabled: true,
    },
    {
      name: "Inventory Viewer",
      description: "View-only access to inventory data",
      icon: <Building className="h-5 w-5 text-blue-600" />,
      enabled: true,
    },
    {
      name: "Reports Generator",
      description: "Can generate and export system reports",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      enabled: true,
    },
    {
      name: "User Administrator",
      description: "Can manage user accounts and permissions",
      icon: <User className="h-5 w-5 text-red-600" />,
      enabled: false,
    },
  ];

  // Mock data for activity logs
  const activityLogs: ActivityLog[] = [
    {
      date: "Today",
      time: "10:45 AM",
      action: "Created purchase order #PO-2023-089",
      ip: "192.168.1.45",
    },
    {
      date: "Yesterday",
      time: "3:22 PM",
      action: "Updated supplier information for Acme Corp",
      ip: "192.168.1.45",
    },
    {
      date: "Oct 15, 2023",
      time: "9:15 AM",
      action: "Generated monthly inventory report",
      ip: "192.168.1.45",
    },
    {
      date: "Oct 12, 2023",
      time: "2:36 PM",
      action: "Password changed",
      ip: "192.168.1.45",
    },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Helper for rendering fields
  const renderField = (
    label: string,
    value: string,
    field: keyof UserProfileFormValues,
    type = "text"
  ) => {
    if (editMode) {
      if (field === "department") {
        return (
          <FormSelect
            name={field}
            label={label}
            options={departmentOptions}
            control={control}
            required
          />
        );
      }
      return (
        <FormInput
          name={field}
          label={label}
          type={type}
          control={control}
          required
        />
      );
    }
    // Read-only mode
    return (
      <div className="flex flex-col relative">
        <label className="block text-xs font-medium mb-1">{label}</label>
        <div className="bg-white border-b border-border px-3 py-2 text-sm select-text pr-10">
          {value}
        </div>
        <Copy
          className="absolute right-3 top-9 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => copyToClipboard(value)}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Management", href: "/management" },
          { label: "Users", href: "/management/users" },
          { label: "User Profile" },
        ]}
      />

      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Basic Information */}
        <div className="bg-blue-50 p-6 rounded-lg col-span-2">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Basic Information</h2>
          </div>
          <p className="text-sm text-gray-500">
            Personal details and contact information
          </p>
        </div>

        {/* Profile Photo */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Profile Photo</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">User profile picture</p>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="flex gap-2">
              <label htmlFor="photo-upload">
                <Button
                  variant="default"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                  size="sm"
                  type="button"
                >
                  Upload Photo
                </Button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
              {photoUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setPhotoUrl(null)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Personal Details</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("First Name", currentValues.firstName, "firstName")}
            {renderField("Last Name", currentValues.lastName, "lastName")}
            {renderField(
              "Email Address",
              currentValues.email,
              "email",
              "email"
            )}
            {renderField("Phone Number", currentValues.phone, "phone")}
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Department", currentValues.department, "department")}
            {renderField("Position", currentValues.position, "position")}
            {renderField("Employee ID", currentValues.employeeId, "employeeId")}
          </div>
        </div>
      </form>

      {/* Roles & Permissions */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Roles & Permissions</h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("assigned")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "assigned"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              type="button"
            >
              Assigned Roles
            </button>
            <button
              onClick={() => setActiveTab("permissions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "permissions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              type="button"
            >
              Permissions
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              type="button"
            >
              Access History
            </button>
          </nav>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {roles.map((role, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
            >
              <div className="flex items-center">
                {role.icon}
                <div className="ml-4">
                  <h3 className="text-sm font-medium">{role.name}</h3>
                  <p className="text-xs text-gray-500">{role.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={role.enabled}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Activity Log</h2>
        <div className="space-y-4">
          {activityLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-start py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {log.action.includes("purchase") ? (
                    <Calendar className="h-4 w-4 text-blue-600" />
                  ) : log.action.includes("supplier") ? (
                    <Building className="h-4 w-4 text-blue-600" />
                  ) : log.action.includes("inventory") ? (
                    <FileText className="h-4 w-4 text-green-600" />
                  ) : (
                    <Lock className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{log.date}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{log.time}</span>
                  </div>
                  <span className="text-xs text-gray-500">IP: {log.ip}</span>
                </div>
                <p className="text-sm mt-1">{log.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button type="button" variant="outline">
          Reset Password
        </Button>
        <Button
          type="button"
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
        >
          Deactivate Account
        </Button>
      </div>
    </div>
  );
}
