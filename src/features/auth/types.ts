import type { Role } from "../../types/global";

export interface User {
  id: string;
  email: string;
  role: Role;
}

//generic interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// export type LoginResponse =  {

// }

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
