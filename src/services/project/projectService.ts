import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import type {
  CreateProjectRequest,
  DeleteResponse,
  Project,
  ProjectListParams,
  UpdateProjectRequest,
} from "../types/api";

// Project API Service
export const projectService = {
  // GET /api/v1/project - List all projects
  getProjects: async (params?: ProjectListParams): Promise<Project[]> => {
    try {
      const response = await apiClient.get("/project", { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET /api/v1/project/{id} - Get single project (if needed)
  getProject: async (id: number): Promise<Project> => {
    try {
      const response = await apiClient.get(`/project/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/project/create - Create new project
  createProject: async (data: CreateProjectRequest): Promise<Project[]> => {
    try {
      const response = await apiClient.post("/project/create", data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/project/edit/{id} - Update project
  updateProject: async (
    id: number,
    data: UpdateProjectRequest
  ): Promise<Project[]> => {
    try {
      const response = await apiClient.post(`/project/edit/${id}`, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE /api/v1/project/delete/{id} - Delete project
  deleteProject: async (id: number): Promise<DeleteResponse> => {
    try {
      const response = await apiClient.delete(`/project/delete/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default projectService;
