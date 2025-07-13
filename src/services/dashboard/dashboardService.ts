import { apiClient, handleApiResponse } from "../api/apiClient";
import type { DashboardStats } from "../mock/mockData";
import { mockDashboardService } from "../mock/mockService";

// Environment variable to toggle mock mode
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Dashboard API Service with mock fallback
export const dashboardService = {
  // GET /api/v1/dashboard/stats/ - Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (USE_MOCK_DATA) {
      return mockDashboardService.getDashboardStats();
    }

    try {
      const response = await apiClient.get("/dashboard/stats/");
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockDashboardService.getDashboardStats();
    }
  },
};
