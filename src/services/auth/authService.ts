import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterRequest,
  User,
} from "../types/api";

// Auth service functions
export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse | undefined> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ROUTES.login,
        credentials
      );
      const data = handleApiResponse(response);

      // Store token and user data
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Calculate and store expiry if provided
        if (data.expiresIn) {
          const expiryTime = Date.now() + data.expiresIn * 1000;
          localStorage.setItem("tokenExpiry", expiryTime.toString());
        }
      }

      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Register new user
  async register(
    userData: RegisterRequest
  ): Promise<LoginResponse | undefined> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ROUTES.register,
        userData
      );
      const data = handleApiResponse(response);

      // Store token and user data after successful registration
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.expiresIn) {
          const expiryTime = Date.now() + data.expiresIn * 1000;
          localStorage.setItem("tokenExpiry", expiryTime.toString());
        }
      }

      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await apiClient.post(API_ROUTES.logout);
    } catch (error) {
      // Even if server logout fails, still clear local storage
      console.warn("Server logout failed:", error);
    } finally {
      // Always clear local storage
      this.clearLocalStorage();
    }
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<LoginResponse | undefined> {
    try {
      const response = await apiClient.post<LoginResponse>(API_ROUTES.refresh, {
        refreshToken,
      } as RefreshTokenRequest);
      const data = handleApiResponse(response);

      // Update stored token
      if (data.token) {
        localStorage.setItem("authToken", data.token);

        if (data.expiresIn) {
          const expiryTime = Date.now() + data.expiresIn * 1000;
          localStorage.setItem("tokenExpiry", expiryTime.toString());
        }

        // Update stored user data if provided
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      return data;
    } catch (error) {
      // Don't automatically clear storage here - let the API client handle it
      // This allows for better error handling and user experience
      return handleApiError(error);
    }
  },

  // Get current user profile
  async getCurrentUser(): Promise<User | undefined> {
    try {
      const response = await apiClient.get<User>(API_ROUTES.me);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User | undefined> {
    try {
      const response = await apiClient.put<User>(API_ROUTES.profile, userData);
      const data = handleApiResponse(response);

      // Update stored user data
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      await apiClient.post(API_ROUTES.changePassword, {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post(API_ROUTES.forgotPassword, { email });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post(API_ROUTES.resetPassword, {
        token,
        newPassword,
      });
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Utility functions
  clearLocalStorage(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token) return false;

    // Check if token is expired
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() > expiryTime) {
        // Don't automatically clear storage here - let API client handle token refresh
        // This prevents unnecessary logouts when tokens can be refreshed
        return false;
      }
    }

    return true;
  },

  // Get stored user data
  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  // Get stored token
  getStoredToken(): string | null {
    return localStorage.getItem("authToken");
  },
};

export default authService;
