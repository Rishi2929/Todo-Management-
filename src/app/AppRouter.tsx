import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { RoleGate } from "../routes/RoleGate";
import { DashboardPage } from "../features/todos/pages/DashboardPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { AdminPage } from "../features/admin/pages/AdminPage";
import { AppLayout } from "../layouts/AppLayout";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGate role="ADMIN">
              <AppLayout>
                <AdminPage />
              </AppLayout>
            </RoleGate>
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
