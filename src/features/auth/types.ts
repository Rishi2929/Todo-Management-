import type { Role } from "../../types/global";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  };
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}
