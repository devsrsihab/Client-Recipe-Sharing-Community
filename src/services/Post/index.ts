"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

// create post
export const createPost = async (formData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("GET_POSTS");

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

// get single post
export const getSinglePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/items/${id}`);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};