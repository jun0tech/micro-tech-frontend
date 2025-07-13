// Centralized API endpoints for auth and other services
export const API_ROUTES = {
  // Auth endpoints
  login: "/user/login/",
  register: "/user/register/",
  refresh: "/user/refresh/",
  logout: "/user/logout/",
  changePassword: "/user/change-password/",
  forgotPassword: "/user/forgot-password/",
  resetPassword: "/user/reset-password/",
  me: "/user/me/",
  profile: "/user/profile/",

  // Inventory endpoints - following REST conventions
  inventoryList: "/inventory/",
  inventoryDetail: "/inventory/", // GET/PUT/DELETE /inventory/{id}/
  inventoryCreate: "/inventory/", // POST /inventory/
  inventoryEdit: "/inventory/", // PUT /inventory/{id}/
  inventoryDelete: "/inventory/", // DELETE /inventory/{id}/

  // Project endpoints - following REST conventions
  projectList: "/project/project/",
  projectDetail: "/project/project/", // GET/PUT/DELETE /project/project/{id}/
  projectCreate: "/project/project/", // POST /project/project/
  projectEdit: "/project/project/", // PUT /project/project/{id}/
  projectDelete: "/project/project/", // DELETE /project/project/{id}/

  // Supplier endpoints - following REST conventions
  supplierList: "/supplier/supplier/",
  supplierDetail: "/supplier/supplier/", // GET/PUT/DELETE /supplier/supplier/{id}/
  supplierCreate: "/supplier/supplier/", // POST /supplier/supplier/
  supplierEdit: "/supplier/supplier/", // PUT /supplier/supplier/{id}/
  supplierDelete: "/supplier/supplier/", // DELETE /supplier/supplier/{id}/

  // Add more endpoints as needed
};
