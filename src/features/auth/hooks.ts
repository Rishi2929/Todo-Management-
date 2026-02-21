import { useDispatch } from "react-redux";
import { setCredentials, logout } from "./authSlice";
import { loginRequest } from "./api";
import { useMutation } from "@tanstack/react-query";
import type { AppDispatch } from "../../app/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        }),
      );
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    logout: () => dispatch(logout()),
  };
};
