import Dashboard from "@/pages/(app)/Dashboard";
import Inventory from "@/pages/(app)/Inventory";
import Suppliers from "@/pages/(app)/Suppliers";
import Login from "@/pages/(auth)/login/index";
import { Navigate, Route, Routes } from "react-router";
import { Sidebar } from "./components/ui/sidebar";
import { useAuthStatus } from "./services";

function App() {
  const { data: authStatus } = useAuthStatus();

  return (
    <>
      <Routes>
        <Route index path="/login" element={<Login />} />
        {authStatus?.isAuthenticated ? (
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="suppliers" element={<Suppliers />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
