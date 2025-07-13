import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
import type {
  CreateSupplierRequest,
  DeleteResponse,
  Supplier,
  SupplierListParams,
  UpdateSupplierRequest,
} from "../types/api";

// Supplier API Service
export const supplierService = {
  // GET /api/v1/supplier/supplier/ - List all suppliers
  getSuppliers: async (params?: SupplierListParams): Promise<Supplier[]> => {
    try {
      const response = await apiClient.get(API_ROUTES.supplierList, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET /api/v1/supplier/supplier/{id}/ - Get single supplier
  getSupplier: async (id: number): Promise<Supplier> => {
    try {
      const response = await apiClient.get(
        `${API_ROUTES.supplierDetail}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/supplier/supplier/ - Create new supplier
  createSupplier: async (data: CreateSupplierRequest): Promise<Supplier[]> => {
    try {
      const response = await apiClient.post(API_ROUTES.supplierCreate, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT /api/v1/supplier/supplier/{id}/ - Update supplier
  updateSupplier: async (
    id: number,
    data: UpdateSupplierRequest
  ): Promise<Supplier[]> => {
    try {
      const response = await apiClient.put(
        `${API_ROUTES.supplierEdit}${id}/`,
        data
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE /api/v1/supplier/supplier/{id}/ - Delete supplier
  deleteSupplier: async (id: number): Promise<DeleteResponse> => {
    try {
      const response = await apiClient.delete(
        `${API_ROUTES.supplierDelete}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default supplierService;
