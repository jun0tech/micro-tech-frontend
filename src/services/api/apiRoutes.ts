// Centralized API endpoints for auth and other services
export const API_ROUTES = {
  login: "/user/login/",
  register: "/user/register/",
  refresh: "/user/refresh/",
  logout: "/user/logout/",
  changePassword: "/user/change-password/",
  forgotPassword: "/user/forgot-password/",
  resetPassword: "/user/reset-password/",
  me: "/user/me/",
  profile: "/user/profile/",
  // Inventory endpoints
  inventoryList: "/inventory/",
  inventoryDetail: "/inventory/",
  inventoryCreate: "/inventory/create/",
  inventoryEdit: "/inventory/edit/",
  inventoryDelete: "/inventory/delete/",
  // Project endpoints
  projectList: "/project/project/",
  projectDetail: "/project/project/",
  projectCreate: "/project/project/",
  projectEdit: "/project/project/",
  projectDelete: "/project/project/",
  // Supplier endpoints
  supplierList: "/supplier/supplier/",
  supplierDetail: "/supplier/supplier/",
  supplierCreate: "/supplier/supplier/",
  supplierEdit: "/supplier/supplier/",
  supplierDelete: "/supplier/supplier/",
  // Add more endpoints as needed
};
