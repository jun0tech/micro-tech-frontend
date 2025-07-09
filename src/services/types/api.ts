// Base API Response type
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
}

// Error response type
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Common types
export interface Project {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  started_at?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn?: number;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  permissions?: string[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Inventory types based on Mock Response.md
export interface InventoryItem {
  id: number;
  project: {
    id: number;
    name: string;
  };
  item_code: number;
  item_name: string;
  category: string;
  in_stock: boolean;
  unit: number;
  reorder_level: number;
  last_update: string;
}

export interface CreateInventoryItemRequest {
  project: number;
  item_code: number;
  item_name: string;
  category: number;
  unit: number;
  reorder_level: number;
}

export interface UpdateInventoryItemRequest {
  project?: number;
  item_code?: number;
  item_name?: string;
  category?: number;
  unit?: number;
  reorder_level?: number;
}

// Extended inventory item for frontend use (combining API data with display data)
export interface InventoryItemWithStatus extends InventoryItem {
  status: "in-stock" | "low-stock" | "out-of-stock";
  brand?: string;
  supplierName?: string;
}

// Project types based on Mock Response.md
export interface CreateProjectRequest {
  name: string;
  description?: string;
  started_at?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  started_at?: string;
}

// Generic CRUD response types
export interface DeleteResponse {
  message: string;
}

// Query parameters for listings
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface InventoryListParams extends PaginationParams {
  project_id?: number;
  category?: string;
  in_stock?: boolean;
}

export interface ProjectListParams extends PaginationParams {
  status?: string;
}

// API endpoint responses
export type InventoryListResponse = InventoryItem[];
export type ProjectListResponse = Project[];
export type InventoryItemResponse = InventoryItem[];
export type ProjectResponse = Project[];
