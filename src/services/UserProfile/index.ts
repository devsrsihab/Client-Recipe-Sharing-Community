"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

// update the user profile
export const updateUserProfile = async (data: any) => {
  try {
    const response = await axiosInstance.put("/users/profile", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// follower list of user
export const getFollowerList = async () => {
  try {
    const response = await axiosInstance.get(`/users/followers`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// following list of user
export const getFollowingList = async () => {
  try {
    const response = await axiosInstance.get(`/users/following`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
