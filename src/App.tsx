import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '#components/Layout';
import Login from '#views/Login';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="dashboard" element={ <>Dashboard</> } />
              <Route path="catalogue" element={ <>Catalogue</> } />
            </Route>

            {/* Fallback Private Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
