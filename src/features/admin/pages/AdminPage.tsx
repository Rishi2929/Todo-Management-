import { useState } from "react";
import { useAllUsers, useDeleteUser, useUpdateUserRole } from "../hooks";
import { toast } from "react-hot-toast";

export const AdminPage = () => {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useAllUsers(page, limit);
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUserRole();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      {data?.data.map((user) => (
        <div key={user._id} className="border p-4 flex justify-between items-center">
          <div>
            <p>{user.name}</p>
            <p className="text-sm text-gray-500">
              {user.email} — {user.role}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={async () => {
                await updateMutation.mutateAsync({
                  id: user._id,
                  updates: {
                    role: user.role === "admin" ? "user" : "admin",
                  },
                });
                toast.success("Role updated");
              }}
              className="px-3 py-1 bg-blue-600 text-white"
            >
              Toggle Role
            </button>

            <button
              onClick={async () => {
                await deleteMutation.mutateAsync(user._id);
                toast.success("User deleted");
              }}
              className="px-3 py-1 bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
