"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

//  get all comments
export const getAllComments = async () => {
  try {
    const response = await axiosInstance.get("/comments");
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

//  update comment status
export const updateCommentStatus = async (id: string, status: string) => {
  try {
    const response = await axiosInstance.put(`/comments/${id}`, { status });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

//  delete comment
export const deleteComment = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/comments/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
