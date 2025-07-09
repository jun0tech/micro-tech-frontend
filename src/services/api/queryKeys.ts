// Query key factories for better cache management and invalidation
// Following React Query best practices for key structure

export const queryKeys = {
  // Auth related queries
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },

  // Inventory related queries
  inventory: {
    all: ["inventory"] as const,
    lists: () => [...queryKeys.inventory.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.inventory.lists(), filters] as const,
    details: () => [...queryKeys.inventory.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.inventory.details(), id] as const,
  },

  // Project related queries
  projects: {
    all: ["projects"] as const,
    lists: () => [...queryKeys.projects.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.projects.details(), id] as const,
  },

  // Categories (if needed later)
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
  },

  // Suppliers (for future use)
  suppliers: {
    all: ["suppliers"] as const,
    lists: () => [...queryKeys.suppliers.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.suppliers.lists(), filters] as const,
    details: () => [...queryKeys.suppliers.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.suppliers.details(), id] as const,
  },

  // Purchase orders (for future use)
  purchaseOrders: {
    all: ["purchaseOrders"] as const,
    lists: () => [...queryKeys.purchaseOrders.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.purchaseOrders.lists(), filters] as const,
    details: () => [...queryKeys.purchaseOrders.all, "detail"] as const,
    detail: (id: number) =>
      [...queryKeys.purchaseOrders.details(), id] as const,
  },
} as const;

// Helper function to invalidate related queries
export const getInvalidationKeys = {
  // When inventory changes, also invalidate projects if needed
  onInventoryChange: (inventoryId?: number) => [
    queryKeys.inventory.all,
    ...(inventoryId ? [queryKeys.inventory.detail(inventoryId)] : []),
  ],

  // When project changes, invalidate related inventory
  onProjectChange: (projectId?: number) => [
    queryKeys.projects.all,
    queryKeys.inventory.all, // Inventory items are linked to projects
    ...(projectId ? [queryKeys.projects.detail(projectId)] : []),
  ],

  // When user logs out, invalidate all user-related data
  onLogout: () => [
    queryKeys.auth.all,
    queryKeys.inventory.all,
    queryKeys.projects.all,
    queryKeys.suppliers.all,
    queryKeys.purchaseOrders.all,
  ],
};
