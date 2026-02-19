export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetUsersPayload {
  search?: string;
  page?: number;
  limit?: number;
  role?: "user" | "admin";
}
