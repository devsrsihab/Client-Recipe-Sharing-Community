"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories?sort=name");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
