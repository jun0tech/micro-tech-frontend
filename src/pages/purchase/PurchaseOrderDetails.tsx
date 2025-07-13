import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building,
  Calendar,
  Check,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Printer,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router";

interface OrderItem {
  id: number;
  name: string;
  size: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

interface ApprovalHistoryItem {
  id: string;
  user: string;
  action: string;
  date: string;
  role: string;
  avatar?: string;
}

export default function PurchaseOrderDetails() {
  const { id } = useParams<{ id: string }>();

  // Mock data for the purchase order
  const orderData = {
    id: id || "PO-2023-001",
    createdDate: "15 Jun 2023",
    project: "Hyatt Regency",
    status: "Pending Approval",
    totalAmount: "$2,775.62",
    supplier: {
      name: "ABC Hardware Suppliers",
      contact: "John Doe (Sales Manager)",
      phone: "+1 (555) 123-4567",
      email: "john.doe@abchardware.com",
    },
    delivery: {
      address: "Hyatt Regency Construction Site",
      expectedDate: "26 Jun 2023",
    },
    notes:
      "Please ensure all items are delivered together. The GT Bar Saddle is needed urgently for ongoing work.",
    items: [
      {
        id: 1,
        name: "GT Bar Saddle",
        size: "28 mm",
        sku: "BOQ-1234",
        quantity: 58,
        unitPrice: 12.5,
        total: 625.0,
        notes: "Urgent",
      },
      {
        id: 2,
        name: "Hexagonal lock nut",
        size: "Standard",
        sku: "BOQ-1235",
        quantity: 260,
        unitPrice: 2.75,
        total: 550.0,
      },
      {
        id: 3,
        name: "Zinc66 cast coupling",
        size: "Medium",
        sku: "BOQ-1236",
        quantity: 35,
        unitPrice: 18.6,
        total: 630.0,
      },
      {
        id: 4,
        name: "GT Rigid conduit pipe",
        size: "10 mm",
        sku: "BOQ-1237",
        quantity: 308,
        unitPrice: 27.75,
        total: 970.62,
      },
    ] as OrderItem[],
    approvalHistory: [
      {
        id: "1",
        user: "John Smith",
        action: "Created by John Smith",
        date: "15 Jun 2023 at 10:30 AM",
        role: "Procurement Manager",
        avatar: "/placeholder-avatar.jpg",
      },
      {
        id: "2",
        user: "Sarah Johnson",
        action: "Pending approval from Sarah Johnson",
        date: "15 Jun 2023 at 2:45 PM",
        role: "Finance Director",
        avatar: "/placeholder-avatar.jpg",
      },
    ] as ApprovalHistoryItem[],
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending approval":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/purchase">Purchase Requests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/purchase/order/${id}/details`}>
              {orderData.id}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <h1 className="text-2xl font-bold">Purchase Order: {orderData.id}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Order Information */}
        <Card className="bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">Created on</p>
            <p className="font-semibold">{orderData.createdDate}</p>
          </CardContent>
        </Card>

        {/* Project */}
        <Card className="bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Building className="h-4 w-4 text-purple-600" />
              Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{orderData.project}</p>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(orderData.status)}>
              {orderData.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card className="bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg">{orderData.totalAmount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.sku}</Badge>
                  </TableCell>
                  <TableCell>{item.quantity} units</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">
                    ${item.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {item.notes && (
                      <Badge variant="destructive" className="text-xs">
                        {item.notes}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Supplier Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">{orderData.supplier.name}</p>
              <p className="text-sm text-gray-600">
                Contact: {orderData.supplier.contact}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{orderData.supplier.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{orderData.supplier.email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-medium">{orderData.delivery.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Delivery</p>
              <p className="font-medium">{orderData.delivery.expectedDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Additional Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
            {orderData.notes}
          </p>
        </CardContent>
      </Card>

      {/* Approval History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Approval History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData.approvalHistory.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.avatar} alt={item.user} />
                  <AvatarFallback>
                    {item.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Button variant="outline" asChild>
          <Link to={`/purchase/order/${id}/add-item`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Order
          </Link>
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-2" />
          Approve
        </Button>
        <Button variant="destructive">
          <X className="h-4 w-4 mr-2" />
          Reject
        </Button>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>
    </div>
  );
}
