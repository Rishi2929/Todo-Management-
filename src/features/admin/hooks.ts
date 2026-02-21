import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchAllUsers, updateUserRequest, deleteUserRequest } from "./api";

/* ------------------ GET USERS ------------------ */

export const useAllUsers = (page: number, limit: number, search?: string, role?: "user" | "admin") => {
  return useQuery({
    queryKey: ["admin-users", page, limit, search, role],
    queryFn: () => fetchAllUsers({ page, limit, search, role }),
    placeholderData: keepPreviousData,
  });
};

/* ------------------ UPDATE USER ------------------ */

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: { role?: "user" | "admin"; name?: string } }) =>
      updateUserRequest(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};

/* ------------------ DELETE USER ------------------ */

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};
