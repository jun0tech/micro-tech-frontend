import { apiClient, handleApiError, handleApiResponse } from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
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
      const response = await apiClient.get(API_ROUTES.projectList, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // GET /api/v1/project/{id} - Get single project (if needed)
  getProject: async (id: number): Promise<Project> => {
    try {
      const response = await apiClient.get(`${API_ROUTES.projectDetail}${id}/`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST /api/v1/project/project/ - Create new project
  createProject: async (data: CreateProjectRequest): Promise<Project[]> => {
    try {
      const response = await apiClient.post(API_ROUTES.projectCreate, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT /api/v1/project/project/{id}/ - Update project
  updateProject: async (
    id: number,
    data: UpdateProjectRequest
  ): Promise<Project[]> => {
    try {
      const response = await apiClient.put(
        `${API_ROUTES.projectEdit}${id}/`,
        data
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE /api/v1/project/project/{id}/ - Delete project
  deleteProject: async (id: number): Promise<DeleteResponse> => {
    try {
      const response = await apiClient.delete(
        `${API_ROUTES.projectDelete}${id}/`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default projectService;
