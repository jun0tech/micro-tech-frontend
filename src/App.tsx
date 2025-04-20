import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '#components/Layout';
import { useAuth } from '#hooks/useAuth';

import ProtectedRoute from './routes';
import './App.css';
import * as React from 'react';

const Login = React.lazy(() => import('#views/Login'));
const Register = React.lazy(() => import('#views/Register'));

const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
  );
}

export default App;
