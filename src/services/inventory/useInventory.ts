import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../api/queryKeys";
import type {
  CreateInventoryItemRequest,
  InventoryItem,
  InventoryListParams,
  UpdateInventoryItemRequest,
} from "../types/api";
import { inventoryService } from "./inventoryService";

// Hook for fetching inventory items
export function useInventoryItems(params?: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.list(params || {}),
    queryFn: () => inventoryService.getInventoryItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching a single inventory item
export function useInventoryItem(id: number) {
  return useQuery({
    queryKey: queryKeys.inventory.detail(id),
    queryFn: () => inventoryService.getInventoryItem(id),
    enabled: !!id,
  });
}

// Hook for creating inventory items
export function useCreateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryItemRequest) =>
      inventoryService.createInventoryItem(data),
    onSuccess: (data) => {
      // Invalidate inventory lists to refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.lists(),
      });

      toast.success("Inventory item created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create inventory item");
    },
  });
}

// Hook for updating inventory items
export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateInventoryItemRequest;
    }) => inventoryService.updateInventoryItem(id, data),
    onSuccess: (data, variables) => {
      // Invalidate inventory lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.lists(),
      });

      // Update specific item cache if we have it
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.detail(variables.id),
      });

      toast.success("Inventory item updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update inventory item");
    },
  });
}

// Hook for deleting inventory items
export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => inventoryService.deleteInventoryItem(id),
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.inventory.lists(),
      });

      // Snapshot the previous value
      const previousItems = queryClient.getQueriesData({
        queryKey: queryKeys.inventory.lists(),
      });

      // Optimistically remove the item from all lists
      queryClient.setQueriesData(
        { queryKey: queryKeys.inventory.lists() },
        (old: InventoryItem[] | undefined) => {
          if (!old) return old;
          return old.filter((item) => item.id !== deletedId);
        }
      );

      // Return a context object with the snapshotted value
      return { previousItems };
    },
    onError: (error: Error, deletedId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousItems) {
        context.previousItems.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.message || "Failed to delete inventory item");
    },
    onSuccess: () => {
      toast.success("Inventory item deleted successfully");
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.lists(),
      });
    },
  });
}

// Utility hook for transforming API data to display data
export function useInventoryItemsWithStatus(params?: InventoryListParams) {
  const { data: items = [], ...query } = useInventoryItems(params);

  const itemsWithStatus = items.map(
    (
      item
    ): InventoryItem & {
      status: "in-stock" | "low-stock" | "out-of-stock";
    } => {
      let status: "in-stock" | "low-stock" | "out-of-stock";

      if (item.unit === 0) {
        status = "out-of-stock";
      } else if (item.unit <= item.reorder_level) {
        status = "low-stock";
      } else {
        status = "in-stock";
      }

      return {
        ...item,
        status,
      };
    }
  );

  return {
    ...query,
    data: itemsWithStatus,
  };
}
