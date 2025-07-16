import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "./dashboardService";

// Query keys for dashboard
const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
};

// Hook for fetching dashboard statistics
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getDashboardStats(),
    staleTime: 30 * 1000, // 30 seconds - reduced from 2 minutes for fresher data
    refetchOnWindowFocus: true,
    refetchOnMount: "always", // Always refetch when component mounts
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes automatically
  });
}
