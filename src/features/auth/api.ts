import { api } from "../../lib/axios";
import type { Role } from "../../types/global";
import type { User } from "./types";

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export const loginRequest = async (payload: LoginPayload) => {
  const response = await api.post("/login", payload);

  const { user, accessToken, refreshToken, expiresIn } = response.data.data;

  //Converts _id → id
  //Normalizes "admin" → "ADMIN"
  const normalizedUser: User = {
    id: user._id,
    email: user.email,
    role: user.role.toUpperCase() as Role,
  };

  return {
    accessToken,
    refreshToken,
    user: normalizedUser,
    expiresIn,
  };
};

export const registerRequest = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await api.post("/register", payload);

  return data;
};

// export const refreshTokenRequest = async (refreshToken: string) => {
//   const response = await api.post("/refresh", {
//     refreshToken,
//   });
//   console.log(response.data.data);
//   return response.data.data;
// };
