import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import type {
  CreateInventoryItemRequest,
  DeleteResponse,
  InventoryItem,
  InventoryListParams,
  UpdateInventoryItemRequest,
} from "../types/api";

// Inventory API Service
export const inventoryService = {
  // GET /api/v1/inventory - List all inventory items
  getInventoryItems: async (
    params?: InventoryListParams
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.get("/inventory", { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET /api/v1/inventory/{id} - Get single inventory item (if needed)
  getInventoryItem: async (id: number): Promise<InventoryItem> => {
    try {
      const response = await apiClient.get(`/inventory/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/inventory/create - Create new inventory item
  createInventoryItem: async (
    data: CreateInventoryItemRequest
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.post("/inventory/create", data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT /api/v1/inventory/edit/{id} - Update inventory item
  updateInventoryItem: async (
    id: number,
    data: UpdateInventoryItemRequest
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.put(`/inventory/edit/${id}`, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE /api/v1/inventory/delete/{id} - Delete inventory item
  deleteInventoryItem: async (id: number): Promise<DeleteResponse> => {
    try {
      const response = await apiClient.delete(`/inventory/delete/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default inventoryService;
