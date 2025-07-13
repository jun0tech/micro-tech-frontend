import { apiClient, handleApiResponse } from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
import { mockSupplierService } from "../mock/mockService";
import type {
  CreateSupplierRequest,
  DeleteResponse,
  Supplier,
  SupplierListParams,
  UpdateSupplierRequest,
} from "../types/api";

// Environment variable to toggle mock mode
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Supplier API Service with mock fallback
export const supplierService = {
  // GET /api/v1/supplier/supplier/ - List all suppliers
  getSuppliers: async (params?: SupplierListParams): Promise<Supplier[]> => {
    if (USE_MOCK_DATA) {
      return mockSupplierService.getSuppliers(params);
    }

    try {
      const response = await apiClient.get(API_ROUTES.supplierList, { params });
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockSupplierService.getSuppliers(params);
    }
  },

  // GET /api/v1/supplier/supplier/{id}/ - Get single supplier
  getSupplier: async (id: number): Promise<Supplier> => {
    if (USE_MOCK_DATA) {
      return mockSupplierService.getSupplier(id);
    }

    try {
      const response = await apiClient.get(
        `${API_ROUTES.supplierDetail}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockSupplierService.getSupplier(id);
    }
  },

  // POST /api/v1/supplier/supplier/ - Create new supplier
  createSupplier: async (data: CreateSupplierRequest): Promise<Supplier[]> => {
    if (USE_MOCK_DATA) {
      return mockSupplierService.createSupplier(data);
    }

    try {
      const response = await apiClient.post(API_ROUTES.supplierCreate, data);
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockSupplierService.createSupplier(data);
    }
  },

  // PUT /api/v1/supplier/supplier/{id}/ - Update supplier
  updateSupplier: async (
    id: number,
    data: UpdateSupplierRequest
  ): Promise<Supplier[]> => {
    if (USE_MOCK_DATA) {
      return mockSupplierService.updateSupplier(id, data);
    }

    try {
      const response = await apiClient.put(
        `${API_ROUTES.supplierEdit}${id}/`,
        data
      );
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockSupplierService.updateSupplier(id, data);
    }
  },

  // DELETE /api/v1/supplier/supplier/{id}/ - Delete supplier
  deleteSupplier: async (id: number): Promise<DeleteResponse> => {
    if (USE_MOCK_DATA) {
      return mockSupplierService.deleteSupplier(id);
    }

    try {
      const response = await apiClient.delete(
        `${API_ROUTES.supplierDelete}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API failed, falling back to mock data:", error);
      return mockSupplierService.deleteSupplier(id);
    }
  },
};

export default supplierService;
