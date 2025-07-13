// Mock service to simulate API responses when real APIs are not available
import type {
  CreateSupplierRequest,
  DeleteResponse,
  LoginRequest,
  LoginResponse,
  Supplier,
  SupplierListParams,
  UpdateSupplierRequest,
  User,
} from "../types/api";
import {
  mockDashboardStats,
  mockNotifications,
  mockPurchaseOrders,
  mockSuppliers,
  mockUsers,
  type DashboardStats,
  type Notification,
  type PurchaseOrder,
} from "./mockData";

// Environment variable to toggle mock mode
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock Auth Service
export const mockAuthService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await delay(800);

    // Simple mock authentication
    if (
      credentials.email === "admin@microtech.com" &&
      credentials.password === "admin"
    ) {
      const user = mockUsers[0];
      return {
        token: "mock-jwt-token-12345",
        user,
        expiresIn: 3600,
      };
    }

    throw new Error("Invalid credentials");
  },

  async getCurrentUser(): Promise<User> {
    await delay(300);
    return mockUsers[0];
  },

  async logout(): Promise<void> {
    await delay(200);
  },
};

// Note: Project APIs are available, so no mock service needed

// Mock Supplier Service
export const mockSupplierService = {
  async getSuppliers(params?: SupplierListParams): Promise<Supplier[]> {
    await delay(600);
    let suppliers = [...mockSuppliers];

    // Apply filters if provided
    if (params?.search) {
      suppliers = suppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(params.search!.toLowerCase()) ||
          (supplier.category &&
            supplier.category
              .toLowerCase()
              .includes(params.search!.toLowerCase()))
      );
    }

    if (params?.category) {
      suppliers = suppliers.filter(
        (supplier) => supplier.category === params.category
      );
    }

    if (params?.status) {
      suppliers = suppliers.filter(
        (supplier) => supplier.status === params.status
      );
    }

    return suppliers;
  },

  async getSupplier(id: number): Promise<Supplier> {
    await delay(400);
    const supplier = mockSuppliers.find((s) => s.id === id);
    if (!supplier) {
      throw new Error("Supplier not found");
    }
    return supplier;
  },

  async createSupplier(data: CreateSupplierRequest): Promise<Supplier[]> {
    await delay(800);
    const newSupplier: Supplier = {
      id: Math.max(...mockSuppliers.map((s) => s.id)) + 1,
      name: data.name,
      contact_person: data.contact_person,
      phone: data.phone,
      email: data.email,
      category: data.category,
      address: data.address,
      status: data.status || "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockSuppliers.push(newSupplier);
    return mockSuppliers;
  },

  async updateSupplier(
    id: number,
    data: UpdateSupplierRequest
  ): Promise<Supplier[]> {
    await delay(700);
    const index = mockSuppliers.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Supplier not found");
    }

    mockSuppliers[index] = {
      ...mockSuppliers[index],
      ...data,
      updated_at: new Date().toISOString(),
    };

    return mockSuppliers;
  },

  async deleteSupplier(id: number): Promise<DeleteResponse> {
    await delay(500);
    const index = mockSuppliers.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Supplier not found");
    }

    mockSuppliers.splice(index, 1);
    return { message: "Supplier deleted successfully" };
  },
};

// Note: Inventory APIs are available, so no mock service needed

// Mock Purchase Order Service
export const mockPurchaseOrderService = {
  async getPurchaseOrders(params?: any): Promise<PurchaseOrder[]> {
    await delay(600);
    let orders = [...mockPurchaseOrders];

    // Apply filters if provided
    if (params?.search) {
      orders = orders.filter(
        (order) =>
          order.po_number
            .toLowerCase()
            .includes(params.search!.toLowerCase()) ||
          order.supplier.name
            .toLowerCase()
            .includes(params.search!.toLowerCase())
      );
    }

    if (params?.status) {
      orders = orders.filter((order) => order.status === params.status);
    }

    return orders;
  },

  async getPurchaseOrder(id: string): Promise<PurchaseOrder> {
    await delay(400);
    const order = mockPurchaseOrders.find((o) => o.id === id);
    if (!order) {
      throw new Error("Purchase order not found");
    }
    return order;
  },

  async createPurchaseOrder(data: any): Promise<PurchaseOrder> {
    await delay(800);
    const newOrder: PurchaseOrder = {
      id: (mockPurchaseOrders.length + 1).toString(),
      po_number: `PO-2024-${String(mockPurchaseOrders.length + 1).padStart(
        3,
        "0"
      )}`,
      order_date: data.order_date || new Date().toISOString().split("T")[0],
      supplier: data.supplier,
      project: data.project,
      delivery_address: data.delivery_address,
      expected_delivery_date: data.expected_delivery_date,
      payment_terms: data.payment_terms,
      department: data.department,
      priority: data.priority || "medium",
      status: "pending",
      total_amount: data.total_amount || 0,
      items: data.items || [],
      notes: data.notes,
      requested_by: data.requested_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockPurchaseOrders.push(newOrder);
    return newOrder;
  },
};

// Mock Dashboard Service
export const mockDashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    return mockDashboardStats;
  },
};

// Mock Notification Service
export const mockNotificationService = {
  async getNotifications(params?: any): Promise<Notification[]> {
    await delay(400);
    let notifications = [...mockNotifications];

    if (params?.category && params.category !== "all") {
      notifications = notifications.filter(
        (n) => n.category === params.category
      );
    }

    if (params?.unread_only) {
      notifications = notifications.filter((n) => !n.read);
    }

    return notifications;
  },

  async markAsRead(id: string): Promise<void> {
    await delay(200);
    const notification = mockNotifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },

  async markAllAsRead(): Promise<void> {
    await delay(300);
    mockNotifications.forEach((n) => (n.read = true));
  },
};

// Export flag to check if we're using mock data
export { USE_MOCK_DATA };

// Helper function to create mock error responses
export const createMockError = (message: string, status: number = 400) => {
  const error = new Error(message) as any;
  error.status = status;
  error.response = {
    status,
    data: { message },
  };
  return error;
};
