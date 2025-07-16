import { type DefaultOptions, QueryClient } from "@tanstack/react-query";

// Default options for React Query
const queryConfig: DefaultOptions = {
  queries: {
    // Time until data is considered stale (5 minutes)
    staleTime: 5 * 60 * 1000,

    // Time until data is garbage collected (10 minutes)
    gcTime: 10 * 60 * 1000,

    // Retry failed requests only once
    retry: 1,

    // Retry delay that increases exponentially
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),

    // Refetch on window focus (can be disabled for better UX)
    refetchOnWindowFocus: false,

    // Refetch on reconnect
    refetchOnReconnect: "always",
  },
  mutations: {
    // Retry mutations only once
    retry: 1,

    // Mutation retry delay
    retryDelay: 1000,
  },
};

// Create and export the query client
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Error handler for global error handling
export const onError = (error: Error) => {
  console.error("React Query Error:", error);

  // You can integrate with error reporting services here
  // For example: Sentry, LogRocket, etc.

  // You can also show toast notifications for errors
  // For example: toast.error(error.message)
};

// Optional: Set up global error boundary
queryClient.getQueryCache().config.onError = onError;
queryClient.getMutationCache().config.onError = onError;

export default queryClient;
