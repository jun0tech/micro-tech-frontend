// API Client
export { apiClient, handleApiError, handleApiResponse } from "./api/apiClient";
export { queryClient } from "./api/queryClient";
export { getInvalidationKeys, queryKeys } from "./api/queryKeys";

// Types
export type * from "./types/api";

// Auth Services and Hooks
export { authService } from "./auth/authService";
export {
  useAuthStatus,
  useChangePassword,
  useCurrentUser,
  useForgotPassword,
  useLogin,
  useLogout,
  useRefreshToken,
  useRegister,
  useResetPassword,
  useUpdateProfile,
} from "./auth/useAuth";

// Future: Inventory Services and Hooks
// export { inventoryService } from './inventory/inventoryService'
// export { useInventory, useCreateInventoryItem, useUpdateInventoryItem } from './inventory/useInventory'

// Future: Project Services and Hooks
// export { projectService } from './project/projectService'
// export { useProjects, useCreateProject, useUpdateProject } from './project/useProject'
