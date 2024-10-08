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

// get user single info
export const getUserSingleInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/profile/${id}`);
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

// follower user
export const followUser = async (id: string) => {
  try {
    const response = await axiosInstance.post("/users/follow", { id });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// unfollow user
export const unfollowUser = async (id: string) => {
  try {
    const response = await axiosInstance.patch("/users/unfollow", { id });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// user recipes
export const getUserRecipes = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/recipes/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
