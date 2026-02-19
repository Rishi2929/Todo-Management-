import { useState } from "react";
import { useAllUsers, useDeleteUser, useUpdateUserRole } from "../hooks";
import { UsersTable } from "../components/UsersTable";
import { toast } from "react-hot-toast";

export const AdminPage = () => {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useAllUsers(page, limit);
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUserRole();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error loading users</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <UsersTable
        users={data?.data ?? []}
        onToggleRole={async (user) => {
          try {
            await updateMutation.mutateAsync({
              id: user._id,
              updates: {
                role: user.role === "ADMIN" ? "user" : "admin",
              },
            });
            toast.success("Role updated");
          } catch {
            toast.error("Update failed");
          }
        }}
        onDelete={async (id) => {
          try {
            await deleteMutation.mutateAsync(id);
            toast.success("User deleted");
          } catch {
            toast.error("Delete failed");
          }
        }}
      />
    </div>
  );
};
