import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../api/queryKeys";
import type {
  CreateSupplierRequest,
  SupplierListParams,
  UpdateSupplierRequest,
} from "../types/api";
import { supplierService } from "./supplierService";

// Hook for fetching suppliers
export function useSuppliers(params?: SupplierListParams) {
  return useQuery({
    queryKey: queryKeys.suppliers.list(params || {}),
    queryFn: () => supplierService.getSuppliers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching a single supplier
export function useSupplier(id: number) {
  return useQuery({
    queryKey: queryKeys.suppliers.detail(id),
    queryFn: () => supplierService.getSupplier(id),
    enabled: !!id,
  });
}

// Hook for creating suppliers
export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupplierRequest) =>
      supplierService.createSupplier(data),
    onSuccess: (data) => {
      // Invalidate supplier lists to refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.suppliers.lists(),
      });

      toast.success("Supplier created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create supplier");
    },
  });
}

// Hook for updating suppliers
export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSupplierRequest }) =>
      supplierService.updateSupplier(id, data),
    onSuccess: (data, variables) => {
      // Invalidate supplier lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.suppliers.lists(),
      });

      // Update specific supplier cache if we have it
      queryClient.invalidateQueries({
        queryKey: queryKeys.suppliers.detail(variables.id),
      });

      toast.success("Supplier updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update supplier");
    },
  });
}

// Hook for deleting suppliers
export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => supplierService.deleteSupplier(id),
    onSuccess: () => {
      // Invalidate supplier lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.suppliers.lists(),
      });

      toast.success("Supplier deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete supplier");
    },
  });
}
