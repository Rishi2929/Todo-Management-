import { userApi } from "../../lib/userApi";

export const fetchProfile = async () => {
  const { data } = await userApi.get("/me");
  return data.data;
};

export const updateProfileRequest = async (payload: { name?: string }) => {
  const { data } = await userApi.patch("/me", payload);
  return data.data;
};

export const changePasswordRequest = async (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
  const { data } = await userApi.post("/me/change-password", payload);
  return data;
};
