import { apiClient, handleApiResponse } from "../api/apiClient";
import type { Notification } from "../mock/mockData";
import { mockNotificationService } from "../mock/mockService";

// Environment variable to toggle mock mode
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Notification API Service with mock fallback
export const notificationService = {
  // GET /api/v1/notifications/ - Get notifications
  getNotifications: async (params?: any): Promise<Notification[]> => {
    if (USE_MOCK_DATA) {
      return mockNotificationService.getNotifications(params);
    }

    try {
      const response = await apiClient.get("/notifications/", { params });
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockNotificationService.getNotifications(params);
    }
  },

  // POST /api/v1/notifications/{id}/mark-read/ - Mark notification as read
  markAsRead: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      return mockNotificationService.markAsRead(id);
    }

    try {
      const response = await apiClient.post(`/notifications/${id}/mark-read/`);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockNotificationService.markAsRead(id);
    }
  },

  // POST /api/v1/notifications/mark-all-read/ - Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    if (USE_MOCK_DATA) {
      return mockNotificationService.markAllAsRead();
    }

    try {
      const response = await apiClient.post("/notifications/mark-all-read/");
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockNotificationService.markAllAsRead();
    }
  },
};
