import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
import type {
  CreateInventoryItemRequest,
  DeleteResponse,
  InventoryItem,
  InventoryListParams,
  UpdateInventoryItemRequest,
} from "../types/api";

// Inventory API Service
export const inventoryService = {
  // GET /api/v1/inventory/ - List all inventory items
  getInventoryItems: async (
    params?: InventoryListParams
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.get(API_ROUTES.inventoryList, {
        params,
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET /api/v1/inventory/{id}/ - Get single inventory item
  getInventoryItem: async (id: number): Promise<InventoryItem> => {
    try {
      const response = await apiClient.get(
        `${API_ROUTES.inventoryDetail}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/inventory/ - Create new inventory item
  createInventoryItem: async (
    data: CreateInventoryItemRequest
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.post(API_ROUTES.inventoryCreate, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT /api/v1/inventory/{id}/ - Update inventory item
  updateInventoryItem: async (
    id: number,
    data: UpdateInventoryItemRequest
  ): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.put(
        `${API_ROUTES.inventoryEdit}${id}/`,
        data
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE /api/v1/inventory/{id}/ - Delete inventory item
  deleteInventoryItem: async (id: number): Promise<DeleteResponse> => {
    try {
      const response = await apiClient.delete(
        `${API_ROUTES.inventoryDelete}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default inventoryService;
