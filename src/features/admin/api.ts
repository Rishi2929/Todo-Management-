// import { userApi } from "../../lib/userApi";
import { userApi } from "../../lib/axios";
import type { UsersResponse, AdminUser, GetUsersPayload } from "./types";
import type { Role } from "../../types/global";

/* ------------------ HELPERS ------------------ */

const normalizeRole = (role: string): Role => role.toUpperCase() as Role;

/* ------------------ GET USERS ------------------ */

export const fetchAllUsers = async (payload: GetUsersPayload): Promise<UsersResponse> => {
  const { data } = await userApi.post<UsersResponse>("/", payload);

  const normalizedUsers: AdminUser[] = data.data.map((user) => ({
    ...user,
    role: normalizeRole(user.role),
  }));

  return {
    ...data,
    data: normalizedUsers,
  };
};

/* ------------------ UPDATE USER ------------------ */

export const updateUserRequest = async (id: string, updates: { name?: string; role?: "user" | "admin" }): Promise<AdminUser> => {
  const { data } = await userApi.patch<{ data: AdminUser }>(`/${id}`, updates);

  return {
    ...data.data,
    role: normalizeRole(data.data.role),
  };
};

/* ------------------ DELETE USER ------------------ */

export const deleteUserRequest = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await userApi.delete(`/${id}`);
  return data;
};
