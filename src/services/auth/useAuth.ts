import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getInvalidationKeys, queryKeys } from "../api/queryKeys";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/api";
import { authService } from "./authService";

// Hook to get current user (only if authenticated)
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: authService.getCurrentUser,
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if user is not authenticated
      if ((error as any)?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Hook to check authentication status
export const useAuthStatus = () => {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => ({
      isAuthenticated: authService.isAuthenticated(),
      user: authService.getStoredUser(),
      token: authService.getStoredToken(),
    }),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Check every minute
  });
};

// Login mutation hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const result = await authService.login(credentials);
      if (!result) throw new Error("Login failed");
      return result;
    },
    onSuccess: (data: LoginResponse) => {
      // Update auth status cache
      queryClient.setQueryData(queryKeys.auth.session(), {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      // Set user data in cache
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Optionally invalidate other queries that might need fresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Clear any stale auth data
      authService.clearLocalStorage();
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

// Register mutation hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<LoginResponse> => {
      const result = await authService.register(userData);
      if (!result) throw new Error("Registration failed");
      return result;
    },
    onSuccess: (data: LoginResponse) => {
      // Update auth status cache
      queryClient.setQueryData(queryKeys.auth.session(), {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      // Set user data in cache
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      authService.clearLocalStorage();
    },
  });
};

// Logout mutation hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Only clear local storage, don't call API
      authService.clearLocalStorage();
    },
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });

      // Invalidate all user-specific data
      const invalidationKeys = getInvalidationKeys.onLogout();
      invalidationKeys.forEach((key) => {
        queryClient.removeQueries({ queryKey: key });
      });

      // Reset query client to clear all cached data
      queryClient.clear();

      // Show success message for intentional logout
      toast.success("You have been logged out successfully.");
      // Redirect to login after a short delay to allow toast to show
      setTimeout(() => navigate("/login", { replace: true }), 100);
    },
    onError: (error) => {
      console.warn(
        "Logout request failed, but clearing local storage anyway:",
        error
      );
      // Even if server logout fails, clear local storage
      authService.clearLocalStorage();
      queryClient.clear();

      // Show message even if logout request failed
      toast.info("You have been logged out.");
      setTimeout(() => navigate("/login", { replace: true }), 300);
    },
  });
};

// Update profile mutation hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) =>
      authService.updateProfile(userData),
    onMutate: async (newUserData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.user() });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(queryKeys.auth.user());

      // Optimistically update to the new value
      if (previousUser) {
        queryClient.setQueryData(queryKeys.auth.user(), {
          ...previousUser,
          ...newUserData,
        });
      }

      // Return a context object with the snapshotted value
      return { previousUser };
    },
    onError: (err, newUserData, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUser) {
        queryClient.setQueryData(queryKeys.auth.user(), context.previousUser);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
    },
  });
};

// Change password mutation hook
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authService.changePassword(currentPassword, newPassword),
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });
};

// Forgot password mutation hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onError: (error) => {
      console.error("Forgot password request failed:", error);
    },
  });
};

// Reset password mutation hook
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => authService.resetPassword(token, newPassword),
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
};

// Refresh token mutation hook (usually called automatically)
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (refreshToken: string): Promise<LoginResponse> => {
      const result = await authService.refreshToken(refreshToken);
      if (!result) throw new Error("Token refresh failed");
      return result;
    },
    onSuccess: (data: LoginResponse) => {
      // Update auth status cache with new token
      queryClient.setQueryData(queryKeys.auth.session(), {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      // Update user data
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
    },
    onError: (error) => {
      // Only clear auth data for specific refresh token errors, not all errors
      console.warn("Token refresh failed:", error);

      // Let the API client handle clearing auth data and redirecting
      // Don't automatically clear here to avoid unnecessary logouts for temporary errors
    },
  });
};
