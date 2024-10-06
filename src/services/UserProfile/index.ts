"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

// update the user profile
export const updateUserProfile = async (data: any) => {
  const response = await axiosInstance.put("/users/profile", data);
  return response.data;
};

// follower list of user
export const getFollowerList = async () => {
  const response = await axiosInstance.get(`/users/followers`);
  return response.data;
};

// following list of user
export const getFollowingList = async () => {
  const response = await axiosInstance.get(`/users/following`);
  return response.data;
};
