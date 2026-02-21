import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfileRequest, changePasswordRequest } from "./api";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const useProfile = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: fetchProfile,
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordRequest,
  });
};
