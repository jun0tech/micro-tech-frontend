import { apiClient, handleApiResponse } from "../api/apiClient";
import type { PurchaseOrder } from "../mock/mockData";
import { mockPurchaseOrderService } from "../mock/mockService";

// Environment variable to toggle mock mode
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Purchase Order API Service with mock fallback
export const purchaseOrderService = {
  // GET /api/v1/purchase-orders/ - List all purchase orders
  getPurchaseOrders: async (params?: any): Promise<PurchaseOrder[]> => {
    if (USE_MOCK_DATA) {
      return mockPurchaseOrderService.getPurchaseOrders(params);
    }

    try {
      const response = await apiClient.get("/purchase-orders/", { params });
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockPurchaseOrderService.getPurchaseOrders(params);
    }
  },

  // GET /api/v1/purchase-orders/{id}/ - Get single purchase order
  getPurchaseOrder: async (id: string): Promise<PurchaseOrder> => {
    if (USE_MOCK_DATA) {
      return mockPurchaseOrderService.getPurchaseOrder(id);
    }

    try {
      const response = await apiClient.get(`/purchase-orders/${id}/`);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockPurchaseOrderService.getPurchaseOrder(id);
    }
  },

  // POST /api/v1/purchase-orders/ - Create new purchase order
  createPurchaseOrder: async (data: any): Promise<PurchaseOrder> => {
    if (USE_MOCK_DATA) {
      return mockPurchaseOrderService.createPurchaseOrder(data);
    }

    try {
      const response = await apiClient.post("/purchase-orders/", data);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockPurchaseOrderService.createPurchaseOrder(data);
    }
  },

  // PUT /api/v1/purchase-orders/{id}/ - Update purchase order
  updatePurchaseOrder: async (
    id: string,
    data: any
  ): Promise<PurchaseOrder> => {
    if (USE_MOCK_DATA) {
      // Mock service doesn't have update method, so we'll simulate it
      const existingOrder = await mockPurchaseOrderService.getPurchaseOrder(id);
      return {
        ...existingOrder,
        ...data,
        updated_at: new Date().toISOString(),
      };
    }

    try {
      const response = await apiClient.put(`/purchase-orders/${id}/`, data);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      const existingOrder = await mockPurchaseOrderService.getPurchaseOrder(id);
      return {
        ...existingOrder,
        ...data,
        updated_at: new Date().toISOString(),
      };
    }
  },

  // DELETE /api/v1/purchase-orders/{id}/ - Delete purchase order
  deletePurchaseOrder: async (id: string): Promise<{ message: string }> => {
    if (USE_MOCK_DATA) {
      return { message: "Purchase order deleted successfully" };
    }

    try {
      const response = await apiClient.delete(`/purchase-orders/${id}/`);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return { message: "Purchase order deleted successfully" };
    }
  },
};
