import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfileRequest, changePasswordRequest } from "./api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
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
