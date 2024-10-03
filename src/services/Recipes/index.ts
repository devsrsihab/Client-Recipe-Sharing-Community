"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getRecipes = async () => {
  try {
    // Remove args from the URL string and use only the params object
    const res = await axiosInstance.get("/recipes");

    return res.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
};
