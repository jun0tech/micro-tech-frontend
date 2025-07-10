import AddInventoryItem from "@/pages/(app)/AddInventoryItem";
import CreatePurchaseOrder from "@/pages/(app)/CreatePurchaseOrder";
import Dashboard from "@/pages/(app)/Dashboard";
import EditInventoryItem from "@/pages/(app)/EditInventoryItem";
import Inventory from "@/pages/(app)/Inventory";
import Suppliers from "@/pages/(app)/Suppliers";
import ViewInventoryItem from "@/pages/(app)/ViewInventoryItem";
import Login from "@/pages/(auth)/login/index";
import PurchaseRequests from "@/pages/purchase/PurchaseRequests";
import UserProfile from "@/pages/users/UserProfile";
import { Navigate, Route, Routes } from "react-router";
import LayoutWrapper from "./components/common/LayoutWrapper";
import NotificationsPage from "./pages/management/notifications";
import { useAuthStatus } from "./services";

function App() {
  const { data: authStatus } = useAuthStatus();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {authStatus?.isAuthenticated ? (
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/new" element={<AddInventoryItem />} />
          <Route path="inventory/edit/:id" element={<EditInventoryItem />} />
          <Route path="inventory/:id" element={<ViewInventoryItem />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="purchase" element={<PurchaseRequests />} />
          <Route path="purchase/new" element={<CreatePurchaseOrder />} />
          <Route
            path="management/notifications"
            element={<NotificationsPage />}
          />
          <Route path="management/users/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
