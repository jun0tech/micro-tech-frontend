import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../api/queryKeys";
import type {
  CreateProjectRequest,
  ProjectListParams,
  UpdateProjectRequest,
} from "../types/api";
import { projectService } from "./projectService";

// Hook for fetching projects
export function useProjects(params?: ProjectListParams) {
  return useQuery({
    queryKey: queryKeys.projects.list(params || {}),
    queryFn: () => projectService.getProjects(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching a single project
export function useProject(id: number) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  });
}

// Hook for creating projects
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      projectService.createProject(data),
    onSuccess: (data) => {
      // Invalidate project lists to refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.lists(),
      });

      toast.success("Project created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}

// Hook for updating projects
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProjectRequest }) =>
      projectService.updateProject(id, data),
    onSuccess: (data, variables) => {
      // Invalidate project lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.lists(),
      });

      // Update specific project cache if we have it
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(variables.id),
      });

      toast.success("Project updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}

// Hook for deleting projects
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: () => {
      // Invalidate project lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.lists(),
      });

      toast.success("Project deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
}
