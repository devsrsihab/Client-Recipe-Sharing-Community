"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

//  get all comments
export const getAllComments = async () => {
  const response = await axiosInstance.get("/comments");
  return response.data;
};

//  update comment status
export const updateCommentStatus = async (id: string, status: string) => {
  const response = await axiosInstance.patch(`/comments/${id}`, { status });
  return response.data;
};

//  delete comment
export const deleteComment = async (id: string) => {
  const response = await axiosInstance.delete(`/comments/${id}`);
  return response.data;
};
