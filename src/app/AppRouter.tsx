import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { RoleGate } from "../routes/RoleGate";
import { DashboardPage } from "../features/todos/pages/DashboardPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { AdminPage } from "../features/admin/pages/AdminPage";

// const DashboardPage = () => <div>Dashboard</div>;
// const ProfilePage = () => <div>Profile</div>;
// const AdminPage = () => <div>Admin</div>;

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
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGate role="ADMIN">
              <AdminPage />
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
