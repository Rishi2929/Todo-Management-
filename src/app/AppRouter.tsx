import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";

const DashboardPage = () => <div>Dashboard</div>;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
