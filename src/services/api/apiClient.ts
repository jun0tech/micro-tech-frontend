import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = "/api/v1";

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_VERSION}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or your preferred storage
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle common errors
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Only attempt refresh if:
          // 1. We have a token
          // 2. This isn't already a retry
          // 3. This isn't a login/register/refresh endpoint
          const token = localStorage.getItem("authToken");
          const isAuthEndpoint =
            originalRequest.url?.includes("/user/login") ||
            originalRequest.url?.includes("/user/register") ||
            originalRequest.url?.includes("/user/refresh");

          if (token && !originalRequest._retry && !isAuthEndpoint) {
            if (isRefreshing) {
              // If already refreshing, queue this request
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                  }
                  return apiClient(originalRequest);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
              // Attempt to refresh token
              const refreshResponse = await axios.post(
                `${API_BASE_URL}${API_VERSION}/user/refresh/`,
                {
                  refreshToken: token,
                }
              );

              const newToken = refreshResponse.data.token;

              if (newToken) {
                localStorage.setItem("authToken", newToken);

                // Update the authorization header for the original request
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                processQueue(null, newToken);

                // Retry the original request
                return apiClient(originalRequest);
              }
            } catch (refreshError) {
              // Refresh failed - this is a real authentication failure
              processQueue(refreshError, null);

              // Clear tokens and redirect to login
              localStorage.removeItem("authToken");
              localStorage.removeItem("user");
              localStorage.removeItem("tokenExpiry");

              // Show user-friendly message
              toast.error("Your session has expired. Please log in again.");

              // Redirect to login page
              if (window.location.pathname !== "/login") {
                window.location.href = "/login";
              }

              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false;
            }
          } else if (isAuthEndpoint) {
            // For auth endpoints, don't show toast (login form will handle it)
            console.error("Authentication failed");
          } else {
            // No token available - redirect to login
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("tokenExpiry");

            toast.error("Please log in to continue.");

            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          }
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.error("Access forbidden");
          toast.error("You don't have permission to perform this action.");
          break;

        case 404:
          console.error("Resource not found");
          // Don't show toast for 404s as they're often expected
          break;

        case 422:
          // Validation errors - let the component handle these
          console.error("Validation error:", error.response.data);
          break;

        case 500:
          console.error("Internal server error");
          toast.error("Server error. Please try again later.");
          // Don't redirect to error page for server errors - let components handle it
          break;

        case 502:
        case 503:
        case 504:
          console.error("Service unavailable");
          toast.error("Service temporarily unavailable. Please try again.");
          break;

        default:
          console.error("API Error:", error.response.data);
          // Only show generic error toast for unexpected errors
          if (status >= 500) {
            toast.error("An unexpected error occurred. Please try again.");
          }
      }
    } else if (error.request) {
      // Network error - don't logout user
      console.error("Network error - no response received");
      toast.error("Network error. Please check your connection and try again.");
    } else {
      // Request setup error
      console.error("Request setup error:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

// Helper function for handling API responses
export const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

// Helper function for handling API errors
export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "An unexpected error occurred";
    throw new Error(message);
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("An unexpected error occurred");
};

export default apiClient;
