import AddEditSupplier from "@/pages/(app)/AddEditSupplier";
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
import ViewSupplier from "@/pages/(app)/ViewSupplier";
import Login from "@/pages/(auth)/login/index";
import Register from "@/pages/(auth)/register";
import NotFound from "@/pages/404";
import ErrorPage from "@/pages/error";
import NotificationsPage from "@/pages/management/notifications";
import PurchaseOrderDetails from "@/pages/purchase/PurchaseOrderDetails";
import PurchaseRequests from "@/pages/purchase/PurchaseRequests";
import UserProfile from "@/pages/users/UserProfile";
import { Navigate, Route, Routes } from "react-router";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LayoutWrapper from "./components/common/LayoutWrapper";
import { ROUTES } from "./constants/routes";
import { useAuthStatus } from "./services";

function App() {
  const { data: authStatus, isLoading } = useAuthStatus();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
            <Route
              path={ROUTES.APP.SUPPLIERS.NEW.slice(1)}
              element={<AddEditSupplier />}
            />
            <Route path="suppliers/edit/:id" element={<AddEditSupplier />} />
            <Route path="suppliers/:id" element={<ViewSupplier />} />

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

            {/* User Routes */}
            <Route
              path={ROUTES.APP.MANAGEMENT.USERS.PROFILE.slice(1)}
              element={<UserProfile />}
            />

            {/* Error Route */}
            <Route path="/error" element={<ErrorPage />} />

            {/* 404 Catch-all Route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            {/* Redirect to login if not authenticated */}
            <Route
              path="*"
              element={<Navigate to={ROUTES.AUTH.LOGIN} replace />}
            />
          </>
        )}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
