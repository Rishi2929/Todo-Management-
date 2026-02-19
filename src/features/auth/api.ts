import { api } from "../../lib/axios";
// import type { LoginResponse } from "./types";

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export const loginRequest = async (payload: LoginPayload) => {
  const response = await api.post("/login", payload);
  console.log("RAW RESPONSE", JSON.stringify(response.data, null, 2));

  const { user, accessToken, refreshToken, expiresIn } = response.data.data;

  return {
    accessToken,
    refreshToken,
    user,
    expiresIn,
  };
};
