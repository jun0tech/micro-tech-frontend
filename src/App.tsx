import { Route, Routes } from "react-router";
import LayoutWrapper from "./components/common/LayoutWrapper";
import { SupplierDetail } from "./features/suppliers/components/supplier-detail";
import AddInventoryItemPage from "./pages/(app)/AddInventoryItem";
import Dashboard from "./pages/(app)/Dashboard";
import Inventory from "./pages/(app)/Inventory";
import Suppliers from "./pages/(app)/Suppliers";
import LoginPage from "./pages/(auth)/login";
import RegisterPage from "./pages/(auth)/register";
import NotificationsPage from "./pages/management/notifications";
import AddOrderItem from "./pages/purchase/AddOrderItem";
import CreatePurchaseOrder from "./pages/purchase/CreatePurchaseOrder";
import PurchaseOrderDetails from "./pages/purchase/PurchaseOrderDetails";
import PurchaseRequests from "./pages/purchase/PurchaseRequests";
import UserProfile from "./pages/users/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="purchase" element={<PurchaseRequests />} />
        <Route path="purchase/new" element={<CreatePurchaseOrder />} />
        <Route path="purchase/order/:id" element={<PurchaseOrderDetails />} />
        <Route path="purchase/order/:id/add-item" element={<AddOrderItem />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="suppliers/:id" element={<SupplierDetail />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/new" element={<AddInventoryItemPage />} />
        <Route path="management/users/profile" element={<UserProfile />} />
        <Route
          path="management/notifications"
          element={<NotificationsPage />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
