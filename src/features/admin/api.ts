import { userApi } from "../../lib/userApi";
import type { UsersResponse, AdminUser, GetUsersPayload } from "./types";

export const fetchAllUsers = async (payload: GetUsersPayload): Promise<UsersResponse> => {
  const { data } = await userApi.post<UsersResponse>("/", payload);
  return data;
};

export const updateUserRequest = async (id: string, updates: { name?: string; role?: "user" | "admin" }): Promise<AdminUser> => {
  const { data } = await userApi.patch<{ data: AdminUser }>(`/${id}`, updates);
  return data.data;
};

export const deleteUserRequest = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await userApi.delete(`/${id}`);
  return data;
};
