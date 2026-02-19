import { useState } from "react";
import { RoleBadge } from "./RoleBadge";
import { DeleteUserModal } from "./DeleteUserModal";
import type { AdminUser } from "../types";

interface Props {
  users: AdminUser[];
  onToggleRole: (user: AdminUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const UsersTable = ({ users, onToggleRole, onDelete }: Props) => {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-gray-600">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <RoleBadge role={user.role} />
              </td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onToggleRole(user)} className="px-3 py-1 bg-blue-600 text-white rounded">
                  Toggle Role
                </button>

                <button onClick={() => setSelectedUser(user)} className="px-3 py-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteUserModal
        open={!!selectedUser}
        userName={selectedUser?.name ?? ""}
        onClose={() => setSelectedUser(null)}
        onConfirm={async () => {
          if (!selectedUser) return;
          await onDelete(selectedUser._id);
          setSelectedUser(null);
        }}
      />
    </>
  );
};
