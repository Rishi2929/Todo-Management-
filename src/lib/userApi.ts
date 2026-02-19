import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

export const userApi = axios.create({
  baseURL: "https://assignment.theregiment.in/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_API_KEY?.trim();
  const token = store.getState().auth.accessToken;

  if (config.headers) {
    config.headers.set("x-api-key", apiKey);

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return config;
});

userApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
