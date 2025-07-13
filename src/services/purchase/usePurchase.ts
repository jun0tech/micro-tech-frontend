import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { purchaseOrderService } from "./purchaseService";

// Query keys for purchase orders
const purchaseOrderKeys = {
  all: ["purchase-orders"] as const,
  lists: () => [...purchaseOrderKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...purchaseOrderKeys.lists(), filters] as const,
  details: () => [...purchaseOrderKeys.all, "detail"] as const,
  detail: (id: string) => [...purchaseOrderKeys.details(), id] as const,
};

// Hook for fetching purchase orders
export function usePurchaseOrders(params?: any) {
  return useQuery({
    queryKey: purchaseOrderKeys.list(params || {}),
    queryFn: () => purchaseOrderService.getPurchaseOrders(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching single purchase order
export function usePurchaseOrder(id: string) {
  return useQuery({
    queryKey: purchaseOrderKeys.detail(id),
    queryFn: () => purchaseOrderService.getPurchaseOrder(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
}

// Hook for creating purchase orders
export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => purchaseOrderService.createPurchaseOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      toast.success("Purchase order created successfully");
    },
    onError: (error) => {
      console.error("Failed to create purchase order:", error);
      toast.error("Failed to create purchase order");
    },
  });
}

// Hook for updating purchase orders
export function useUpdatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      purchaseOrderService.updatePurchaseOrder(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.detail(id) });
      toast.success("Purchase order updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update purchase order:", error);
      toast.error("Failed to update purchase order");
    },
  });
}

// Hook for deleting purchase orders
export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => purchaseOrderService.deletePurchaseOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      toast.success("Purchase order deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete purchase order:", error);
      toast.error("Failed to delete purchase order");
    },
  });
}
