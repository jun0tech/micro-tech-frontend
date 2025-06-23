/**
 * MicroTech IMS - Theme Configuration
 * This file contains the theme configuration for the IMS application.
 */

export const colors = {
  // Primary color with shades - Deep blue that conveys trust, security, and professionalism
  primary: {
    50: "#e6f1ff",
    100: "#cce3ff",
    200: "#99c7ff",
    300: "#66abff",
    400: "#338fff",
    500: "#0073e6", // Main primary color
    600: "#005cb8",
    700: "#00448a",
    800: "#002d5c",
    900: "#00172e",
  },

  // Neutral colors - For text, backgrounds, and UI elements
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Success color with shades
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },

  // Warning color with shades
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Danger/Error color with shades
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Information color with shades
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
};

// Reusable spacing values
export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
};

// Border radius values
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.25rem", // 4px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  xxl: "1rem", // 16px
  full: "9999px", // Fully rounded (circle for squares)
};

// Reusable shadow styles
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Common container classes
export const containers = {
  page: "max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8",
  card: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
  cardHover: "transition-all duration-200 hover:shadow-lg",
};

// Common button styles
export const buttons = {
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-200",
  danger: "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  outline:
    "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
  sizes: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6",
  },
};

// Form element styles
export const forms = {
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white",
  select:
    "block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white",
  checkbox:
    "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800",
  formGroup: "mb-4",
};

// Typography styles
export const typography = {
  h1: "text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl",
  h2: "text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl",
  h3: "text-xl font-bold text-gray-900 dark:text-white sm:text-2xl",
  h4: "text-lg font-bold text-gray-900 dark:text-white",
  h5: "text-base font-bold text-gray-900 dark:text-white",
  body: "text-base text-gray-700 dark:text-gray-300",
  small: "text-sm text-gray-500 dark:text-gray-400",
  link: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",
};

// Common utility classes
export const utils = {
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexStart: "flex items-center justify-start",
  flexEnd: "flex items-center justify-end",
  grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-4",
  grid3Cols: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  grid4Cols: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
  srOnly: "sr-only",
  truncate: "truncate",
};

// Common layout utilities
export const layout = {
  section: "py-12",
  sectionHeader: "mb-8 text-center",
};

// Combine all utilities
export const theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  containers,
  buttons,
  forms,
  typography,
  utils,
  layout,
};

export default theme;
