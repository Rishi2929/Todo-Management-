import { useState } from "react";
import { useAllUsers, useDeleteUser, useUpdateUserRole } from "../hooks";
import { UsersTable } from "../components/UsersTable";
import { toast } from "react-hot-toast";
import { Loader2, Shield } from "lucide-react";
import type { AdminUser } from "../types";

export const AdminPage = () => {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useAllUsers(page, limit);
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUserRole();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleRole = async (user: AdminUser) => {
    try {
      setUpdatingId(user._id);

      await updateMutation.mutateAsync({
        id: user._id,
        updates: {
          role: user.role === "ADMIN" ? "user" : "admin",
        },
      });

      toast.success("Role updated");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.success("User deleted");
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-red-700">Failed to load users</h2>
          <p className="text-xs text-red-600 mt-2">Please refresh or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-600" />
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage users and control access roles</p>
          </div>

          <div className="text-xs text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
            Page {page} • {limit} per page
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
          <UsersTable
            users={data?.data ?? []}
            isDeleting={deleteMutation.isPending}
            updatingId={updatingId}
            onToggleRole={handleToggleRole}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};
