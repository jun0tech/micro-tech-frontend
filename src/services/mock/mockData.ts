// Mock data for demo purposes when APIs are not available
import type { Supplier, User } from "../types/api";

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@microtech.com",
    name: "John Doe",
    role: "admin",
    permissions: ["read", "write", "delete"],
  },
  {
    id: 2,
    email: "sarah.johnson@microtech.com",
    name: "Sarah Johnson",
    role: "manager",
    permissions: ["read", "write"],
  },
];

// Note: Projects API is available, so no mock data needed

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "ABC Hardware Suppliers",
    contact_person: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@abchardware.com",
    category: "hardware",
    address: "123 Industrial Ave, Construction District, NY 10001",
    status: "active",
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: 2,
    name: "Global Tech Solutions",
    contact_person: "Emily Chen",
    phone: "+1 (555) 987-6543",
    email: "emily.chen@globaltech.com",
    category: "electronics",
    address: "456 Tech Park Blvd, Silicon Valley, CA 94025",
    status: "active",
    created_at: "2023-02-20T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  {
    id: 3,
    name: "Precision Parts Ltd.",
    contact_person: "Michael Rodriguez",
    phone: "+1 (555) 456-7890",
    email: "michael.r@precisionparts.com",
    category: "manufacturing",
    address: "789 Manufacturing Dr, Industrial Zone, TX 75201",
    status: "active",
    created_at: "2023-03-10T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: 4,
    name: "Quality Chemicals Inc.",
    contact_person: "Sarah Wilson",
    phone: "+1 (555) 321-0987",
    email: "sarah.wilson@qualitychem.com",
    category: "chemicals",
    address: "321 Chemical Plant Rd, Industrial City, NJ 07001",
    status: "active",
    created_at: "2023-04-05T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: 5,
    name: "EcoPackaging Inc.",
    contact_person: "David Brown",
    phone: "+1 (555) 654-3210",
    email: "david.brown@ecopack.com",
    category: "packaging",
    address: "654 Green Way, Eco District, OR 97201",
    status: "active",
    created_at: "2023-05-12T00:00:00Z",
    updated_at: "2023-12-28T00:00:00Z",
  },
  {
    id: 6,
    name: "Steel Masters Corp",
    contact_person: "Lisa Anderson",
    phone: "+1 (555) 789-0123",
    email: "lisa.anderson@steelmasters.com",
    category: "construction",
    address: "987 Steel Mill Ave, Heavy Industry, PA 15201",
    status: "pending",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
];

// Note: Inventory APIs are available, so no mock data needed

// Mock Purchase Orders
export interface PurchaseOrder {
  id: string;
  po_number: string;
  order_date: string;
  supplier: {
    id: number;
    name: string;
    contact_person: string;
    phone: string;
    email: string;
  };
  project: {
    id: number;
    name: string;
  };
  delivery_address: string;
  expected_delivery_date: string;
  payment_terms: string;
  department: string;
  priority: "low" | "medium" | "high" | "urgent";
  status:
    | "draft"
    | "pending"
    | "approved"
    | "rejected"
    | "delivered"
    | "cancelled";
  total_amount: number;
  items: PurchaseOrderItem[];
  notes?: string;
  requested_by: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderItem {
  id: string;
  item_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  sku?: string;
  size?: string;
  notes?: string;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    po_number: "PO-2024-001",
    order_date: "2024-01-15",
    supplier: {
      id: 1,
      name: "ABC Hardware Suppliers",
      contact_person: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@abchardware.com",
    },
    project: {
      id: 1,
      name: "Hyatt Regency Hotel",
    },
    delivery_address: "Hyatt Regency Construction Site, Downtown District",
    expected_delivery_date: "2024-01-25",
    payment_terms: "net-30",
    department: "procurement",
    priority: "high",
    status: "approved",
    total_amount: 2775.62,
    requested_by: "John Doe",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-15T10:45:00Z",
    notes:
      "Please ensure all items are delivered together. The GT Bar Saddle is needed urgently for ongoing work.",
    items: [
      {
        id: "1",
        item_name: "GT Bar Saddle",
        description: "Heavy duty bar saddle for construction",
        quantity: 58,
        unit_price: 12.5,
        total: 725.0,
        sku: "BOQ-1234",
        size: "28 mm",
        notes: "Urgent",
      },
      {
        id: "2",
        item_name: "Hexagonal lock nut",
        description: "Standard hexagonal lock nuts",
        quantity: 260,
        unit_price: 2.75,
        total: 715.0,
        sku: "BOQ-1235",
        size: "Standard",
      },
      {
        id: "3",
        item_name: "Zinc66 cast coupling",
        description: "Zinc cast coupling for plumbing",
        quantity: 35,
        unit_price: 18.6,
        total: 651.0,
        sku: "BOQ-1236",
        size: "Medium",
      },
      {
        id: "4",
        item_name: "GT Rigid conduit pipe",
        description: "Rigid conduit pipe for electrical work",
        quantity: 28,
        unit_price: 31.23,
        total: 874.44,
        sku: "BOQ-1237",
        size: "10 mm",
      },
    ],
  },
  {
    id: "2",
    po_number: "PO-2024-002",
    order_date: "2024-01-12",
    supplier: {
      id: 2,
      name: "Global Tech Solutions",
      contact_person: "Emily Chen",
      phone: "+1 (555) 987-6543",
      email: "emily.chen@globaltech.com",
    },
    project: {
      id: 2,
      name: "Nagdhunga Tunnel",
    },
    delivery_address: "Nagdhunga Tunnel Site Office, Highway Section",
    expected_delivery_date: "2024-01-20",
    payment_terms: "net-60",
    department: "operations",
    priority: "medium",
    status: "pending",
    total_amount: 15420.0,
    requested_by: "Sarah Johnson",
    created_at: "2024-01-12T14:20:00Z",
    updated_at: "2024-01-13T09:15:00Z",
    items: [
      {
        id: "5",
        item_name: "Industrial Sensors",
        description: "High-precision industrial sensors for monitoring",
        quantity: 12,
        unit_price: 450.0,
        total: 5400.0,
        sku: "SENS-001",
      },
      {
        id: "6",
        item_name: "Control Panels",
        description: "Automated control panels for tunnel systems",
        quantity: 4,
        unit_price: 2505.0,
        total: 10020.0,
        sku: "CTRL-002",
      },
    ],
  },
  {
    id: "3",
    po_number: "PO-2024-003",
    order_date: "2024-01-10",
    supplier: {
      id: 3,
      name: "Precision Parts Ltd.",
      contact_person: "Michael Rodriguez",
      phone: "+1 (555) 456-7890",
      email: "michael.r@precisionparts.com",
    },
    project: {
      id: 3,
      name: "Highway Bridge Construction",
    },
    delivery_address: "Bridge Construction Site, River Crossing Point",
    expected_delivery_date: "2024-01-18",
    payment_terms: "cod",
    department: "operations",
    priority: "urgent",
    status: "delivered",
    total_amount: 8950.0,
    requested_by: "Mike Wilson",
    created_at: "2024-01-10T11:30:00Z",
    updated_at: "2024-01-18T16:45:00Z",
    items: [
      {
        id: "7",
        item_name: "Bridge Bearings",
        description: "Heavy duty bridge bearing assemblies",
        quantity: 8,
        unit_price: 1118.75,
        total: 8950.0,
        sku: "BEAR-001",
        size: "Large",
      },
    ],
  },
];

// Mock Dashboard Data
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalInventoryItems: number;
  lowStockItems: number;
  pendingPurchaseOrders: number;
  totalSuppliers: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "inventory" | "purchase" | "project" | "supplier";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export const mockDashboardStats: DashboardStats = {
  totalProjects: 5, // Static value since projects API is available
  activeProjects: 4, // Static value since projects API is available
  totalInventoryItems: 25, // Static value since inventory API is available
  lowStockItems: 3, // Static value since inventory API is available
  pendingPurchaseOrders: mockPurchaseOrders.filter(
    (po) => po.status === "pending"
  ).length,
  totalSuppliers: mockSuppliers.filter((s) => s.status === "active").length,
  recentActivity: [
    {
      id: "1",
      type: "purchase",
      title: "Purchase Order Approved",
      description: "PO-2024-001 for Hyatt Regency Hotel has been approved",
      timestamp: "2024-01-15T10:45:00Z",
      user: "Sarah Johnson",
    },
    {
      id: "2",
      type: "inventory",
      title: "Low Stock Alert",
      description: "Tunnel Boring Drill Bits below reorder level",
      timestamp: "2024-01-15T09:30:00Z",
      user: "System",
    },
    {
      id: "3",
      type: "project",
      title: "Project Updated",
      description: "City Hospital Expansion progress updated to 80%",
      timestamp: "2024-01-14T16:20:00Z",
      user: "Mike Wilson",
    },
    {
      id: "4",
      type: "supplier",
      title: "New Supplier Added",
      description: "Steel Masters Corp added to supplier network",
      timestamp: "2024-01-14T14:10:00Z",
      user: "John Doe",
    },
  ],
};

// Mock Notifications
export interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: "purchase" | "inventory" | "supplier" | "project" | "system";
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Purchase order #PO-2024-001 approved",
    message:
      "Your purchase order for Hyatt Regency Hotel was approved by finance.",
    time: "10 minutes ago",
    read: false,
    category: "purchase",
  },
  {
    id: "2",
    type: "warning",
    title: "Low inventory alert: Tunnel Boring Drill Bits",
    message: "Inventory below threshold in Nagdhunga Tunnel project.",
    time: "1 hour ago",
    read: false,
    category: "inventory",
  },
  {
    id: "3",
    type: "info",
    title: "New supplier request from Steel Masters Corp",
    message: "New supplier Steel Masters Corp is pending approval.",
    time: "3 hours ago",
    read: false,
    category: "supplier",
  },
  {
    id: "4",
    type: "success",
    title: "Project 'City Hospital Expansion' milestone reached",
    message: "Project completion updated to 80%.",
    time: "Yesterday at 4:30 PM",
    read: true,
    category: "project",
  },
  {
    id: "5",
    type: "system",
    title: "System maintenance scheduled",
    message: "Scheduled maintenance on January 25, 3:00 AM.",
    time: "Yesterday at 2:15 PM",
    read: true,
    category: "system",
  },
];
