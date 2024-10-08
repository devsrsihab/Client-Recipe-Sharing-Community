import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followUser,
  getFollowerList,
  getFollowingList,
  getUserSingleInfo,
  unfollowUser,
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
export const useGetUserSingleInfo = (id: string) => {
  return useQuery({
    queryKey: ["USER_PROFILE_INFO_SINGLE", id],
    queryFn: async () => await getUserSingleInfo(id),
    refetchOnWindowFocus: false,
  });
};

// follow user
export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (id) => await followUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["USER_PROFILE_INFO_SINGLE", id],
      });
      toast.success("User Followed Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// unfollow user
export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async (id) => await unfollowUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["USER_PROFILE_INFO_SINGLE", id],
      });
      toast.success("User Unfollowed Successfully");
    },
    onError: (error) => toast.error(error.message),
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
