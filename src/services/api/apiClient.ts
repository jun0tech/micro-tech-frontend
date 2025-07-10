import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

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
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          // You might want to trigger a redirect to login here
          // or emit an event that your auth context can listen to
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 422:
          // Validation errors
          console.error("Validation error:", error.response.data);
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("API Error:", error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error("Network error - no response received");
    } else {
      console.error("Request setup error:", error.message);
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
