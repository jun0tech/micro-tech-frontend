// Centralized route constants for better maintainability
export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  // Main app routes
  APP: {
    DASHBOARD: "/",

    // Inventory routes
    INVENTORY: {
      LIST: "/inventory",
      NEW: "/inventory/new",
      VIEW: (id: string | number) => `/inventory/${id}`,
      EDIT: (id: string | number) => `/inventory/edit/${id}`,
    },

    // Purchase routes
    PURCHASE: {
      LIST: "/purchase",
      NEW: "/purchase/new",
      ORDER_DETAILS: (id: string | number) => `/purchase/order/${id}/details`,
      ADD_ORDER_ITEM: (id: string | number) => `/purchase/order/${id}/add-item`,
    },

    // Project routes
    PROJECTS: {
      LIST: "/projects",
      NEW: "/projects/new",
      VIEW: (id: string | number) => `/projects/${id}`,
      EDIT: (id: string | number) => `/projects/edit/${id}`,
    },

    // Supplier routes
    SUPPLIERS: {
      LIST: "/suppliers",
      NEW: "/suppliers/new",
      VIEW: (id: string | number) => `/suppliers/${id}`,
      EDIT: (id: string | number) => `/suppliers/edit/${id}`,
    },

    // Management routes
    MANAGEMENT: {
      NOTIFICATIONS: "/management/notifications",
      SETTINGS: "/management/settings",
      USERS: {
        PROFILE: "/management/users/profile",
        LIST: "/management/users",
        VIEW: (id: string | number) => `/management/users/${id}`,
      },
    },
  },
} as const;

// Helper function to generate breadcrumb-friendly labels
export const ROUTE_LABELS: Record<string, string> = {
  "": "Dashboard",
  dashboard: "Dashboard",
  inventory: "Inventory",
  purchase: "Purchase",
  projects: "Projects",
  suppliers: "Suppliers",
  management: "Management",
  notifications: "Notifications",
  settings: "Settings",
  users: "Users",
  profile: "Profile",
  new: "New",
  add: "Add",
  edit: "Edit",
  view: "View",
  details: "Details",
  "add-item": "Add Item",
  order: "Order",
};

// Route patterns for dynamic matching
export const ROUTE_PATTERNS = {
  INVENTORY_ITEM: "/inventory/:id",
  INVENTORY_EDIT: "/inventory/edit/:id",
  PROJECT_ITEM: "/projects/:id",
  PROJECT_EDIT: "/projects/edit/:id",
  SUPPLIER_ITEM: "/suppliers/:id",
  SUPPLIER_EDIT: "/suppliers/edit/:id",
  PURCHASE_ORDER_DETAILS: "/purchase/order/:id/details",
  PURCHASE_ORDER_ADD_ITEM: "/purchase/order/:id/add-item",
  USER_PROFILE: "/management/users/:id",
} as const;
