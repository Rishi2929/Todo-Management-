import axios from "axios";
import type { AxiosInstance } from "axios";
import { store } from "../app/store";
import { setCredentials, logout } from "../features/auth/authSlice";

const BASE_URL = "https://assignment.theregiment.in/api/v1";
const AUTH_URL = `${BASE_URL}/auth`;

// ─── Refresh token state ───────────────────────────────────────────────────
let isRefreshing = false;

let subscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

// ─── Factory ───────────────────────────────────────────────────────────────
const createInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor — attach API key + Bearer token
  instance.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY?.trim();
    const token = store.getState().auth.accessToken;
    console.log("Axios ts", token);

    config.headers.set("x-api-key", apiKey);

    const isAuthRoute = ["/login", "/register", "/refresh"].some((url) => config.url?.includes(url));

    if (token && !isAuthRoute) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  });

  // Response interceptor — silent token refresh on 401
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { config, response } = error;

      // Case 1 - Not 401 or already tried once
      if (response?.status !== 401 || config._retry) {
        return Promise.reject(error);
      }

      console.log("Config: ", config);

      // Queue requests while a refresh is already in flight
      // Case 2 - If already refreshing
      if (isRefreshing) {
        return new Promise((resolve) =>
          subscribers.push((token) => {
            config.headers.set("Authorization", `Bearer ${token}`);
            resolve(instance(config));
          })
        );
      }

      //Case 3 - If not refreshing yet
      config._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken, user } = store.getState().auth;
        if (!refreshToken) throw new Error("No refresh token");

        // Call refresh API
        const { data } = await axios.post(`${AUTH_URL}/refresh`, { refreshToken }, { headers: { "x-api-key": import.meta.env.VITE_API_KEY } });

        // If refresh succeeds
        const { accessToken: newAt, refreshToken: newRt } = data.data;
        console.log("Refresh succeeded: ", data.data);

        // Updating redux store
        store.dispatch(
          setCredentials({
            accessToken: newAt,
            refreshToken: newRt,
            user: user!,
          })
        );
        //notify waiting requests
        onTokenRefreshed(newAt);

        // Retrying original request
        config.headers.set("Authorization", `Bearer ${newAt}`);
        return instance(config);
      } catch (err) {
        // If user fails
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return instance;
};

// ─── Named exports (drop-in replacements) ─────────────────────────────────
export const api = createInstance(AUTH_URL);
export const todoApi = createInstance(`${BASE_URL}/todos`);
export const userApi = createInstance(`${BASE_URL}/users`);
