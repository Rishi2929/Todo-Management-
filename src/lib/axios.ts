import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

export const api = axios.create({
  baseURL: "https://assignment.theregiment.in/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;

  const token = store.getState().auth.accessToken;

  const isAuthRoute = config.url?.includes("/login") || config.url?.includes("/register") || config.url?.includes("/refresh");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
