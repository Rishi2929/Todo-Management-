import { useState } from "react";
import { RoleBadge } from "./RoleBadge";
import { DeleteUserModal } from "./DeleteUserModal";
import type { AdminUser } from "../types";
import { Loader2, Shield, Trash2 } from "lucide-react";

interface Props {
  users: AdminUser[];
  onToggleRole: (user: AdminUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
  updatingId: string | null;
}

export const UsersTable = ({ users, onToggleRole, onDelete, isDeleting, updatingId }: Props) => {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    await onDelete(selectedUser._id);
    setSelectedUser(null);
  };
  return (
    <>
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  <td className="px-4 py-4 font-medium text-gray-900 rounded-l-xl">{user.name}</td>
                  <td className="px-4 py-4 text-gray-600">{user.email}</td>
                  <td className="px-4 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-4 rounded-r-xl">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onToggleRole(user)}
                        disabled={updatingId === user._id}
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white shadow-sm disabled:opacity-60"
                      >
                        {updatingId === user._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                        Toggle
                      </button>

                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              <div className="flex items-center justify-between">
                <RoleBadge role={user.role} />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onToggleRole(user)}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  <Shield className="h-4 w-4" />
                  Toggle Role
                </button>

                <button
                  onClick={() => setSelectedUser(user)}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteUserModal
        open={!!selectedUser}
        userName={selectedUser?.name ?? ""}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
