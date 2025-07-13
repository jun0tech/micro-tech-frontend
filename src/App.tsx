import AddInventoryItem from "@/pages/(app)/AddInventoryItem";
import CreateProject from "@/pages/(app)/CreateProject";
import CreatePurchaseOrder from "@/pages/(app)/CreatePurchaseOrder";
import Dashboard from "@/pages/(app)/Dashboard";
import EditInventoryItem from "@/pages/(app)/EditInventoryItem";
import EditProject from "@/pages/(app)/EditProject";
import Inventory from "@/pages/(app)/Inventory";
import Projects from "@/pages/(app)/Projects";
import Suppliers from "@/pages/(app)/Suppliers";
import ViewInventoryItem from "@/pages/(app)/ViewInventoryItem";
import ViewProject from "@/pages/(app)/ViewProject";
import Login from "@/pages/(auth)/login/index";
import Register from "@/pages/(auth)/register";
import NotificationsPage from "@/pages/management/notifications";
import PurchaseOrderDetails from "@/pages/purchase/PurchaseOrderDetails";
import PurchaseRequests from "@/pages/purchase/PurchaseRequests";
import UserProfile from "@/pages/users/UserProfile";
import { Navigate, Route, Routes } from "react-router";
import LayoutWrapper from "./components/common/LayoutWrapper";
import { ROUTES } from "./constants/routes";
import { useAuthStatus } from "./services";

function App() {
  const { data: authStatus } = useAuthStatus();

  return (
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
      {authStatus?.isAuthenticated ? (
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<Dashboard />} />

          {/* Inventory Routes */}
          <Route
            path={ROUTES.APP.INVENTORY.LIST.slice(1)}
            element={<Inventory />}
          />
          <Route
            path={ROUTES.APP.INVENTORY.NEW.slice(1)}
            element={<AddInventoryItem />}
          />
          <Route path="inventory/edit/:id" element={<EditInventoryItem />} />
          <Route path="inventory/:id" element={<ViewInventoryItem />} />

          {/* Project Routes */}
          <Route
            path={ROUTES.APP.PROJECTS.LIST.slice(1)}
            element={<Projects />}
          />
          <Route
            path={ROUTES.APP.PROJECTS.NEW.slice(1)}
            element={<CreateProject />}
          />
          <Route path="projects/edit/:id" element={<EditProject />} />
          <Route path="projects/:id" element={<ViewProject />} />

          {/* Supplier Routes */}
          <Route
            path={ROUTES.APP.SUPPLIERS.LIST.slice(1)}
            element={<Suppliers />}
          />

          {/* Purchase Routes */}
          <Route
            path={ROUTES.APP.PURCHASE.LIST.slice(1)}
            element={<PurchaseRequests />}
          />
          <Route
            path={ROUTES.APP.PURCHASE.NEW.slice(1)}
            element={<CreatePurchaseOrder />}
          />
          <Route
            path="purchase/order/:id/details"
            element={<PurchaseOrderDetails />}
          />

          {/* Management Routes */}
          <Route
            path={ROUTES.APP.MANAGEMENT.NOTIFICATIONS.slice(1)}
            element={<NotificationsPage />}
          />
          <Route
            path={ROUTES.APP.MANAGEMENT.USERS.PROFILE.slice(1)}
            element={<UserProfile />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />
      )}
    </Routes>
  );
}

export default App;
