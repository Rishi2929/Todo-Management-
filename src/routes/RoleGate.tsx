import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Role } from "../types/global";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const RoleGate = ({ role, children }: { role: Role; children: ReactNode }) => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  if (userRole !== role) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};
