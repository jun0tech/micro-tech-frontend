import { z } from "zod";

// Common validation patterns
export const ValidationPatterns = {
  // Text validations
  requiredString: (fieldName: string, minLength = 1) =>
    z.string().min(minLength, `${fieldName} is required`),

  name: (fieldName: string, minLength = 2) =>
    z
      .string()
      .min(minLength, `${fieldName} must be at least ${minLength} characters`),

  description: (required = false) =>
    required
      ? z.string().min(5, "Description must be at least 5 characters")
      : z.string().optional(),

  // Contact validations
  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),

  // Number validations
  positiveNumber: (fieldName: string) =>
    z
      .string()
      .min(1, `${fieldName} is required`)
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        `${fieldName} must be a positive number`
      ),

  nonNegativeNumber: (fieldName: string) =>
    z
      .string()
      .min(1, `${fieldName} is required`)
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        `${fieldName} must be a valid number`
      ),

  // Date validations
  dateString: (required = false) =>
    required ? z.string().min(1, "Date is required") : z.string().optional(),

  // Selection validations
  selectOption: (fieldName: string) =>
    z.string().min(1, `Please select a ${fieldName.toLowerCase()}`),

  // Optional string that can be empty
  optionalString: (minLength = 2) =>
    z
      .string()
      .min(minLength, `Must be at least ${minLength} characters`)
      .optional()
      .or(z.literal("")),

  // Password validations
  password: z.string().min(6, "Password must be at least 6 characters"),

  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
};

// Common reusable schemas
export const CommonSchemas = {
  // Address schema
  address: z.object({
    street: ValidationPatterns.optionalString(5),
    city: ValidationPatterns.optionalString(2),
    state: ValidationPatterns.optionalString(2),
    zipCode: ValidationPatterns.optionalString(3),
    country: ValidationPatterns.optionalString(2),
  }),

  // Contact information schema
  contactInfo: z.object({
    email: ValidationPatterns.email.optional().or(z.literal("")),
    phone: ValidationPatterns.phone,
  }),

  // Date range schema
  dateRange: z.object({
    startDate: ValidationPatterns.dateString(false),
    endDate: ValidationPatterns.dateString(false),
  }),

  // Password with confirmation
  passwordWithConfirmation: z
    .object({
      password: ValidationPatterns.password,
      confirmPassword: ValidationPatterns.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
};

// Common dropdown options
export const CommonOptions = {
  departments: [
    { value: "procurement", label: "Procurement" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
    { value: "it", label: "IT" },
    { value: "hr", label: "Human Resources" },
    { value: "management", label: "Management" },
  ],

  categories: [
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
  ],

  units: [
    { value: "pcs", label: "Pieces" },
    { value: "kg", label: "Kilograms" },
    { value: "meters", label: "Meters" },
    { value: "liters", label: "Liters" },
    { value: "boxes", label: "Boxes" },
    { value: "bags", label: "Bags" },
    { value: "rolls", label: "Rolls" },
    { value: "sets", label: "Sets" },
  ],

  paymentTerms: [
    { value: "net-30", label: "Net 30" },
    { value: "net-60", label: "Net 60" },
    { value: "cod", label: "Cash on Delivery" },
    { value: "advance", label: "Advance Payment" },
  ],

  priorities: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ],

  statuses: {
    supplier: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending Approval" },
    ],
  },
};

// Utility functions for form handling
export const FormUtils = {
  // Convert empty strings to undefined for optional fields
  cleanOptionalFields: <T extends Record<string, any>>(data: T): T => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] === "") {
        (cleaned as any)[key] = undefined;
      }
    });
    return cleaned;
  },
};
