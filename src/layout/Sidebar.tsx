import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useAuth } from "../features/auth/hooks";
import { LayoutDashboard, User, Shield, LogOut } from "lucide-react";
import { useEffect } from "react";

export const Sidebar = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const { logout } = useAuth();

  const linkBase = "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200";

  const active = "text-indigo-600";
  const inactive = "text-gray-500 hover:text-gray-900";

  useEffect(() => {
    console.log("sidebar");
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 flex-col bg-white border-r border-gray-200 min-h-screen">
        <div className="px-6 py-6 border-b border-gray-100">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Workspace Overview</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Todos</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>

          {role === "ADMIN" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Shield className="h-5 w-5" />
              <span>Admin</span>
            </NavLink>
          )}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition
            hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-sm">
        <div className="grid grid-cols-3">
          <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Todos</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>

          {role === "ADMIN" ? (
            <NavLink to="/admin" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
              <Shield className="h-5 w-5" />
              <span>Admin</span>
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
