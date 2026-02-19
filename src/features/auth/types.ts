import type { Role } from "../../types/global";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
