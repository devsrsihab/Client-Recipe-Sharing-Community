import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFollowerList,
  getFollowingList,
  getUserSingleInfo,
  updateUserProfile,
} from "../services/UserProfile";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

//DONE update user profile
export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER_BY_ID"],
    mutationFn: async (data) => await updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS", "SINGLE_USER"] });
      toast.success("User Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// get user single info
export const useGetUserSingleInfo = () => {
  return useQuery({
    queryKey: ["USER_PROFILE_INFO"],
    queryFn: async () => await getUserSingleInfo(),
    refetchOnWindowFocus: false,
  });
};

// get user followers
export const useGetUserFollowers = () => {
  return useQuery({
    queryKey: ["USER_PROFILE_FOLLOWERS"],
    queryFn: async () => await getFollowerList(),
  });
};

// get user following
export const useGetUserFollowing = () => {
  return useQuery({
    queryKey: ["USER_PROFILE_FOLLOWING"],
    queryFn: async () => await getFollowingList(),
  });
};
